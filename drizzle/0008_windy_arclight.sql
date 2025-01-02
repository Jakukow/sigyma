ALTER TABLE "goal-exercise" DROP CONSTRAINT "goal-exercise_exercise_best_id_exercise_best_id_fk";
--> statement-breakpoint
ALTER TABLE "goal-exercise" ADD COLUMN "actual_weight" real;--> statement-breakpoint
ALTER TABLE "goal-exercise" DROP COLUMN IF EXISTS "exercise_best_id";