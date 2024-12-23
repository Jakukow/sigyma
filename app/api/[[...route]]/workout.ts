import { db } from "@/src/drizzle";
import {
  insertWorkoutResultsSchema,
  workoutResults,
  workoutSession,
} from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";

import { Hono } from "hono";
import { z } from "zod";

const app = new Hono().post(
  "/",
  clerkMiddleware(),
  zValidator(
    "json",
    z.object({
      trainingId: z
        .number()
        .nonnegative("Training ID must be a non-negative number"),
      results: z.array(
        insertWorkoutResultsSchema.pick({
          exerciseId: true,
          setNumber: true,
          reps: true,
          weight: true,
        })
      ),
    })
  ),
  async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { trainingId, results } = c.req.valid("json");

    try {
      const [session] = await db
        .insert(workoutSession)
        .values({
          clerkId: auth.userId,
          workoutDate: new Date(),
          trainingId,
        })
        .returning();

      if (!session) {
        return c.json({ error: "Failed to create workout session" }, 500);
      }

      const workoutResultsData = results.map((result) => ({
        ...result,
        workoutSessionId: session.id,
      }));

      const insertedResults = await db
        .insert(workoutResults)
        .values(workoutResultsData)
        .returning();

      if (insertedResults.length === 0) {
        return c.json({ error: "Failed to insert workout results" }, 500);
      }

      return c.json({ data: { session, results: insertedResults } });
    } catch (error) {
      console.error("Error processing workout submission:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
);
export default app;
