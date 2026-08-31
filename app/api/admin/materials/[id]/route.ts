import { requireAdminApi } from "../../../../../lib/admin-auth";
import { ensureMaterialSchema, getD1, getMaterialsBucket, isMaterialRegion } from "../../../../../lib/material-storage";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const { id } = await params;
  await ensureMaterialSchema();
  const payload = (await request.json()) as { region?: unknown; title?: unknown; theme?: unknown; description?: unknown };
  if (!isMaterialRegion(payload.region)) return Response.json({ error: "Região inválida." }, { status: 400 });

  const database = getD1();
  const uploaded = await database.prepare("SELECT id FROM uploaded_materials WHERE id = ?").bind(id).first<{ id: string }>();
  if (uploaded) {
    const title = typeof payload.title === "string" ? payload.title.trim() : null;
    const theme = typeof payload.theme === "string" ? payload.theme.trim() : null;
    const description = typeof payload.description === "string" ? payload.description.trim() : null;
    await database.prepare(`
      UPDATE uploaded_materials
      SET region = ?, title = COALESCE(?, title), theme = COALESCE(?, theme),
          description = COALESCE(?, description), updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(payload.region, title || null, theme || null, description, id).run();
  } else {
    await database.prepare(`
      INSERT INTO material_regions (material_id, region, updated_by, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(material_id) DO UPDATE SET
        region = excluded.region,
        updated_by = excluded.updated_by,
        updated_at = CURRENT_TIMESTAMP
    `).bind(id, payload.region, auth.user.email).run();
  }

  return Response.json({ ok: true, id, region: payload.region });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const { id } = await params;
  await ensureMaterialSchema();
  const database = getD1();
  const uploaded = await database.prepare("SELECT object_key FROM uploaded_materials WHERE id = ?").bind(id).first<{ object_key: string }>();
  if (!uploaded) return Response.json({ error: "Somente arquivos enviados pelo painel podem ser excluídos." }, { status: 400 });

  await getMaterialsBucket().delete(uploaded.object_key);
  await database.prepare("DELETE FROM uploaded_materials WHERE id = ?").bind(id).run();
  return Response.json({ ok: true });
}
