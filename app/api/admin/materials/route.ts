import { requireAdminApi } from "../../../../lib/admin-auth";
import {
  getD1,
  ensureMaterialSchema,
  getMaterialsBucket,
  isMaterialKind,
  isMaterialRegion,
  publicMaterial,
  type UploadedMaterialRow,
} from "../../../../lib/material-storage";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 95 * 1024 * 1024;

function cleanFilename(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  try {
    await ensureMaterialSchema();
    const formData = await request.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") ?? "").trim();
    const kind = formData.get("kind");
    const theme = String(formData.get("theme") ?? "Campanha").trim() || "Campanha";
    const region = formData.get("region");
    const description = String(formData.get("description") ?? "").trim();

    if (!(file instanceof File) || !file.size) return Response.json({ error: "Escolha um arquivo." }, { status: 400 });
    if (!title) return Response.json({ error: "Informe o título do material." }, { status: 400 });
    if (!isMaterialKind(kind)) return Response.json({ error: "Escolha uma categoria válida." }, { status: 400 });
    if (!isMaterialRegion(region)) return Response.json({ error: "Escolha uma região válida." }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return Response.json({ error: "O arquivo deve ter no máximo 95 MB." }, { status: 400 });

    const id = `upload-${crypto.randomUUID()}`;
    const objectKey = `uploads/${Date.now()}-${crypto.randomUUID()}-${cleanFilename(file.name)}`;
    const contentType = file.type || "application/octet-stream";
    const format = contentType.startsWith("video/") ? "Vídeo MP4" : contentType.startsWith("audio/") ? "Áudio MP3" : contentType === "application/pdf" ? "Documento PDF" : contentType.startsWith("image/") ? "Imagem" : file.name.split(".").pop()?.toUpperCase() || "Arquivo";
    const bucket = getMaterialsBucket();
    await bucket.put(objectKey, file.stream(), {
      httpMetadata: { contentType },
      customMetadata: { originalName: file.name, uploadedBy: auth.user.email },
    });

    const database = getD1();
    try {
      await database.prepare(`
        INSERT INTO uploaded_materials
          (id, title, kind, format, theme, region, description, object_key, content_type, size, original_name, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(id, title, kind, format, theme, region, description, objectKey, contentType, file.size, file.name, auth.user.email).run();
    } catch (error) {
      await bucket.delete(objectKey);
      throw error;
    }

    const row = await database.prepare(`
      SELECT id, title, kind, format, theme, region, description, object_key,
             content_type, size, original_name, created_at, updated_at
      FROM uploaded_materials WHERE id = ?
    `).bind(id).first<UploadedMaterialRow>();

    return Response.json({ material: row ? publicMaterial(row) : null }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível enviar o arquivo.";
    return Response.json({ error: message }, { status: 500 });
  }
}
