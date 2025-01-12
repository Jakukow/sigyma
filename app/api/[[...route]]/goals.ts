import { db } from "@/src/drizzle";
import {
  exerciseBest,
  goalExercise,
  insertGoalsSchema,
  exercises,
} from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, count, eq, gt, sql } from "drizzle-orm";

import { Hono } from "hono";
import { z } from "zod";

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
  )
  .post(
    "/change-order",
    clerkMiddleware(),
    zValidator(
      "json",
      z.array(
        insertGoalsSchema.pick({
          clerkId: true,
          id: true,
          order: true,
        })
      )
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const results = c.req.valid("json");

      for (const result of results) {
        if (!result.id) {
          return c.json({ error: "Id missing" }, 401);
        }

        await db
          .update(goalExercise)
          .set({
            order: result.order,
          })
          .where(
            and(
              eq(goalExercise.id, +result.id),
              eq(goalExercise.clerkId, auth.userId)
            )
          );
      }
      return c.json({ results });
    }
  )
  .post(
    "/delete-goal",
    clerkMiddleware(),
    zValidator(
      "json",
      insertGoalsSchema.pick({
        id: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { id } = c.req.valid("json");
      if (!id) {
        return c.json({ error: "Id missing" }, 401);
      }

      const goalToDelete = await db
        .select({
          order: goalExercise.order,
        })
        .from(goalExercise)
        .where(
          and(eq(goalExercise.id, +id), eq(goalExercise.clerkId, auth.userId))
        )
        .limit(1);

      if (goalToDelete.length === 0) {
        return c.json({ error: "Goal not found" }, 404);
      }

      const { order } = goalToDelete[0];

      await db
        .delete(goalExercise)
        .where(
          and(eq(goalExercise.id, +id), eq(goalExercise.clerkId, auth.userId))
        );

      await db
        .update(goalExercise)
        .set({
          order: sql`${goalExercise.order} - 1`,
        })
        .where(
          and(
            eq(goalExercise.clerkId, auth.userId),
            gt(goalExercise.order, order)
          )
        );

      return c.json({ success: true });
    }
  );

export default app;
