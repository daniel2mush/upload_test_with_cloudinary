CREATE TABLE "upload" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"file_url" text NOT NULL,
	"thumbnail_url" text,
	"file_id" text NOT NULL
);
