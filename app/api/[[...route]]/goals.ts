import { db } from "@/src/drizzle";
import {
  exerciseBest,
  goalExercise,
  insertGoalsSchema,
  exercises,
} from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, count, eq } from "drizzle-orm";

import { Hono } from "hono";

const app = new Hono()
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertGoalsSchema.pick({
        color: true,
        reps: true,
        weight: true,
        exerciseId: true,
        exerciseName: true,
        unit: true,
      })
    ),
    async (c) => {
      const exercise = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const [counts] = await db.select({ count: count() }).from(goalExercise);
      const [data1] = await db
        .select()
        .from(exerciseBest)
        .innerJoin(exercises, eq(exerciseBest.exerciseId, exercises.id))
        .where(
          and(
            eq(exercises.id, exercise.exerciseId),
            eq(exerciseBest.clerkId, auth.userId)
          )
        );

      const actualWeight = data1?.exercise_best?.bestWeight || 0;

      const [data] = await db
        .insert(goalExercise)
        .values({
          ...exercise,
          clerkId: auth.userId,
          order: counts.count + 1,
          actualweight: actualWeight,
        })
        .returning();

      return c.json({ data });
    }
  )
  .get(
    "/",
    clerkMiddleware(),

    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const goalsList = await db
        .select()
        .from(goalExercise)
        .where(eq(goalExercise.clerkId, auth.userId))
        .orderBy(goalExercise.order);

      return c.json({ goalsList });
    }
  );

export default app;
