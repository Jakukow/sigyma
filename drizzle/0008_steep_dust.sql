CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"marker_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"review_title" text NOT NULL,
	"review_body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"comfort_score" integer NOT NULL,
	"clean_score" integer NOT NULL,
	"eq_score" integer NOT NULL,
	"atmosphere_score" integer NOT NULL,
	"overall_score" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "markers" ADD COLUMN "scores" real[] DEFAULT '{}';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_marker_id_markers_id_fk" FOREIGN KEY ("marker_id") REFERENCES "public"."markers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
