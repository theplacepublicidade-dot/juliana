import { ensureMaterialSchema, getD1, getMaterialsBucket } from "../../../../lib/material-storage";

export const dynamic = "force-dynamic";

function parseRange(value: string | null, size: number) {
  const match = value?.match(/^bytes=(\d*)-(\d*)$/);
  if (!match) return null;
  const [, rawStart, rawEnd] = match;
  if (!rawStart && !rawEnd) return null;
  const start = rawStart ? Number(rawStart) : Math.max(0, size - Number(rawEnd));
  const end = rawEnd && rawStart ? Math.min(size - 1, Number(rawEnd)) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start || start >= size) return null;
  return { start, end, length: end - start + 1 };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await ensureMaterialSchema();
  const database = getD1();
  const row = await database.prepare(
    "SELECT object_key, content_type, original_name, size FROM uploaded_materials WHERE id = ?",
  ).bind(id).first<{ object_key: string; content_type: string; original_name: string; size: number }>();

  if (!row) return new Response("Arquivo não encontrado.", { status: 404 });

  const range = parseRange(request.headers.get("range"), row.size);
  const object = await getMaterialsBucket().get(
    row.object_key,
    range ? { range: { offset: range.start, length: range.length } } : undefined,
  );
  if (!object) return new Response("Arquivo não encontrado.", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Type", row.content_type);
  headers.set("Cache-Control", "public, max-age=3600");
  headers.set("ETag", object.httpEtag);
  headers.set("Accept-Ranges", "bytes");
  if (range) {
    headers.set("Content-Range", `bytes ${range.start}-${range.end}/${row.size}`);
    headers.set("Content-Length", String(range.length));
  }
  if (new URL(request.url).searchParams.get("download") === "1") {
    headers.set("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(row.original_name)}`);
  }
  return new Response(object.body, { headers, status: range ? 206 : 200 });
}
