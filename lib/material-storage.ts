import { env } from "cloudflare:workers";
import type { MaterialKind, MaterialRegion } from "../app/materials";

export type UploadedMaterialRow = {
  id: string;
  title: string;
  kind: MaterialKind;
  format: string;
  theme: string;
  region: MaterialRegion;
  description: string;
  object_key: string;
  content_type: string;
  size: number;
  original_name: string;
  created_at: string;
  updated_at: string;
};

type RuntimeEnv = {
  DB?: D1Database;
  MATERIALS?: R2Bucket;
  ADMIN_EMAIL?: string;
};

export function getRuntimeEnv() {
  return env as unknown as RuntimeEnv;
}

export function getD1() {
  const database = getRuntimeEnv().DB;
  if (!database) throw new Error("Banco de dados indisponível.");
  return database;
}

let schemaPromise: Promise<unknown> | null = null;

export function ensureMaterialSchema() {
  if (schemaPromise) return schemaPromise;
  const database = getD1();
  schemaPromise = database.batch([
    database.prepare(`
      CREATE TABLE IF NOT EXISTS material_regions (
        material_id TEXT PRIMARY KEY NOT NULL,
        region TEXT NOT NULL DEFAULT 'ambas',
        updated_by TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),
    database.prepare(`
      CREATE TABLE IF NOT EXISTS uploaded_materials (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        kind TEXT NOT NULL,
        format TEXT NOT NULL,
        theme TEXT NOT NULL,
        region TEXT NOT NULL DEFAULT 'ambas',
        description TEXT NOT NULL DEFAULT '',
        object_key TEXT NOT NULL UNIQUE,
        content_type TEXT NOT NULL,
        size INTEGER NOT NULL,
        original_name TEXT NOT NULL,
        created_by TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),
    database.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_uploaded_materials_object_key ON uploaded_materials(object_key)"),
  ]).then(() => database.prepare("PRAGMA optimize").run());
  return schemaPromise;
}

export function getMaterialsBucket() {
  const bucket = getRuntimeEnv().MATERIALS;
  if (!bucket) throw new Error("Armazenamento de arquivos indisponível.");
  return bucket;
}

export function getAdminEmail() {
  return (getRuntimeEnv().ADMIN_EMAIL ?? "plataformascomunicacao@gmail.com").trim().toLowerCase();
}

export function isMaterialRegion(value: unknown): value is MaterialRegion {
  return value === "norte" || value === "vale-do-araguaia" || value === "ambas";
}

export function isMaterialKind(value: unknown): value is MaterialKind {
  return ["Fotos", "Vídeos", "Músicas", "Artes", "Logos", "Impressos", "Documentos", "Identidade"].includes(String(value));
}

export function publicMaterial(row: UploadedMaterialRow) {
  const isImage = row.content_type.startsWith("image/");
  return {
    id: row.id,
    title: row.title,
    kind: row.kind,
    format: row.format,
    theme: row.theme,
    region: row.region,
    description: row.description,
    localFile: `/api/files/${encodeURIComponent(row.id)}`,
    thumb: isImage ? `/api/files/${encodeURIComponent(row.id)}` : undefined,
    uploaded: true,
    size: row.size,
    originalName: row.original_name,
    createdAt: row.created_at,
  };
}
