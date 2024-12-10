CREATE TABLE IF NOT EXISTS "markers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"gym_name" text NOT NULL,
	"gym_adress" text NOT NULL,
	"lat" text NOT NULL
);
