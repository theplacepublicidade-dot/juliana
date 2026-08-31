CREATE TABLE `material_regions` (
	`material_id` text PRIMARY KEY NOT NULL,
	`region` text DEFAULT 'ambas' NOT NULL,
	`updated_by` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `uploaded_materials` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`kind` text NOT NULL,
	`format` text NOT NULL,
	`theme` text NOT NULL,
	`region` text DEFAULT 'ambas' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`object_key` text NOT NULL,
	`content_type` text NOT NULL,
	`size` integer NOT NULL,
	`original_name` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uploaded_materials_object_key_unique` ON `uploaded_materials` (`object_key`);
--> statement-breakpoint
PRAGMA optimize;
