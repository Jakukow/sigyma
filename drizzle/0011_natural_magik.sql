CREATE TABLE IF NOT EXISTS "plan_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"exercise_id" integer NOT NULL,
	"series_number" integer NOT NULL,
	"day_of_week" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainingplan_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"training_plan_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"series_number" integer NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainingplans" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan_name" text NOT NULL,
	"day_week" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan_exercises" ADD CONSTRAINT "plan_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainingplan_exercises" ADD CONSTRAINT "trainingplan_exercises_training_plan_id_trainingplans_id_fk" FOREIGN KEY ("training_plan_id") REFERENCES "public"."trainingplans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainingplan_exercises" ADD CONSTRAINT "trainingplan_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
