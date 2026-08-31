import { ensureMaterialSchema, getD1, publicMaterial, type UploadedMaterialRow } from "../../../lib/material-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureMaterialSchema();
    const database = getD1();
    const [uploadedResult, regionResult] = await Promise.all([
      database.prepare(`
        SELECT id, title, kind, format, theme, region, description, object_key,
               content_type, size, original_name, created_at, updated_at
        FROM uploaded_materials
        ORDER BY created_at DESC
      `).all<UploadedMaterialRow>(),
      database.prepare("SELECT material_id, region FROM material_regions").all<{ material_id: string; region: string }>(),
    ]);

    return Response.json({
      uploaded: (uploadedResult.results ?? []).map(publicMaterial),
      regions: Object.fromEntries((regionResult.results ?? []).map((row) => [row.material_id, row.region])),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível carregar os materiais.";
    return Response.json({ error: message }, { status: 500 });
  }
}
