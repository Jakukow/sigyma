CREATE TABLE IF NOT EXISTS "week_streak" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"week_start" timestamp DEFAULT now() NOT NULL,
	"streak_count" integer DEFAULT 0 NOT NULL,
	"last_workout_date" timestamp
);
