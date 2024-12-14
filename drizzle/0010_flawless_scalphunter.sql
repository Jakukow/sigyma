CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"exercise_name" text NOT NULL,
	"exercise_description" text NOT NULL,
	"exercise_unit" text NOT NULL
);
