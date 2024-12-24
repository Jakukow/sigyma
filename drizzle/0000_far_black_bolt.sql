CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"exercise_name" text NOT NULL,
	"exercise_description" text NOT NULL,
	"exercise_unit" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "markers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"gym_name" text NOT NULL,
	"gym_adress" text NOT NULL,
	"gym_city" text NOT NULL,
	"lat" text NOT NULL,
	"lng" text NOT NULL,
	"scores" real[] DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"marker_id" integer NOT NULL,
	"user_name" text NOT NULL,
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
CREATE TABLE IF NOT EXISTS "trainingplan_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"training_plan_id" integer NOT NULL,
	"ex-name" text NOT NULL,
	"unit" text NOT NULL,
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
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"username" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"exercise_id" integer NOT NULL,
	"workout_session_id" integer NOT NULL,
	"set_number" integer NOT NULL,
	"reps" integer NOT NULL,
	"weight" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"workout_date" timestamp DEFAULT now() NOT NULL,
	"training_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_marker_id_markers_id_fk" FOREIGN KEY ("marker_id") REFERENCES "public"."markers"("id") ON DELETE cascade ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_results" ADD CONSTRAINT "workout_results_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_results" ADD CONSTRAINT "workout_results_workout_session_id_workout_session_id_fk" FOREIGN KEY ("workout_session_id") REFERENCES "public"."workout_session"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_training_id_trainingplans_id_fk" FOREIGN KEY ("training_id") REFERENCES "public"."trainingplans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
