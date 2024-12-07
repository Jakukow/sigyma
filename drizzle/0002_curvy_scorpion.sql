ALTER TABLE "users" RENAME COLUMN "clerk_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE text;