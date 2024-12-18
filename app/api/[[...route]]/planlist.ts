import { db } from "@/src/drizzle";
import {
  insertTrainingPlansSchema,
  trainingPlanExercises,
  trainingPlans,
} from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";

import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        plan: insertTrainingPlansSchema.pick({
          dayOfWeek: true,
          planName: true,
        }),
        exercises: z.array(
          z.object({
            exerciseId: z.number(),
            seriesNumber: z.number().min(1),
            order: z.number().min(1),
            exerciseName: z.string(),
          })
        ),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const body = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [trainingPlan] = await db
        .insert(trainingPlans)
        .values({
          clerkId: auth.userId,
          dayOfWeek: body.plan.dayOfWeek,
          planName: body.plan.planName,
        })
        .returning();

      const exercises = body.exercises.map((exercise) => ({
        trainingPlanId: trainingPlan.id,
        exerciseId: exercise.exerciseId,
        seriesNumber: exercise.seriesNumber,
        order: exercise.order,
        exerciseName: exercise.exerciseName,
      }));

      await db.insert(trainingPlanExercises).values(exercises);

      return c.json({ data: trainingPlan, exercises });
    }
  )
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }

    const planList = await db
      .select()
      .from(trainingPlans)
      .where(eq(trainingPlans.clerkId, auth.userId));
    return c.json({ planList });
  })
  .post(
    "/delete-plan",
    clerkMiddleware(),
    zValidator(
      "json",
      insertTrainingPlansSchema.pick({
        id: true,
      })
    ),
    async (c) => {
      const trainingPlan = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!trainingPlan.id) {
        return c.json({ error: "Invalid marker ID" }, 400);
      }

      const deletedPlan = await db
        .delete(trainingPlans)
        .where(
          and(
            eq(trainingPlans.clerkId, auth.userId),
            eq(trainingPlans.id, trainingPlan.id)
          )
        )
        .returning();

      return c.json({
        data: deletedPlan,
        message: "Training plan deleted successfully",
      });
    }
  )
  .get(
    "/get-exercises",
    clerkMiddleware(),

    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401);
      }
      const id = c.req.query("id");

      if (!id) {
        return c.json({ error: "'id' is required" }, 400);
      }

      const exerciseList = await db
        .select()
        .from(trainingPlanExercises)
        .where(eq(trainingPlanExercises.trainingPlanId, +id))
        .orderBy(trainingPlanExercises.order);
      return c.json({ exerciseList });
    }
  );

export default app;
