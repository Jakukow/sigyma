CREATE TABLE IF NOT EXISTS "goal-exercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"exercise_id" integer NOT NULL,
	"exercise_best_id" integer NOT NULL,
	"weigh" real NOT NULL,
	"reps" integer,
	"color" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goal-exercise" ADD CONSTRAINT "goal-exercise_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goal-exercise" ADD CONSTRAINT "goal-exercise_exercise_best_id_exercise_best_id_fk" FOREIGN KEY ("exercise_best_id") REFERENCES "public"."exercise_best"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
