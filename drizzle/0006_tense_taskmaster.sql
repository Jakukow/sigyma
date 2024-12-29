ALTER TABLE "goal-exercise" ALTER COLUMN "exercise_best_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "goal-exercise" ADD COLUMN "order" integer NOT NULL;