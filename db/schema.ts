import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const uploadedMaterials = sqliteTable("uploaded_materials", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  kind: text("kind").notNull(),
  format: text("format").notNull(),
  theme: text("theme").notNull(),
  region: text("region").notNull().default("ambas"),
  description: text("description").notNull().default(""),
  objectKey: text("object_key").notNull().unique(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull(),
  originalName: text("original_name").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const materialRegions = sqliteTable("material_regions", {
  materialId: text("material_id").primaryKey(),
  region: text("region").notNull().default("ambas"),
  updatedBy: text("updated_by").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
