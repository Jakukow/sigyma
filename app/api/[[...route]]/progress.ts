import { db } from "@/src/drizzle";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { workoutSession, workoutResults } from "@/src/schema";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(),

    async (c) => {
      const auth = getAuth(c);
      const id = c.req.query("id");
      if (!id) {
        return c.json({ error: "'id' is required" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const progress = await db
        .select({
          date: workoutSession.workoutDate,
          totalVolume: sql<number>`SUM(COALESCE(${workoutResults.reps}, 1) * ${workoutResults.weight})`,
        })
        .from(workoutResults)
        .innerJoin(
          workoutSession,
          eq(workoutResults.workoutSessionId, workoutSession.id)
        )
        .where(eq(workoutSession.trainingId, +id))
        .groupBy(workoutSession.workoutDate)
        .orderBy(workoutSession.workoutDate);

      return c.json({ progress });
    }
  )
  .get(
    "/exercise-progress",
    clerkMiddleware(),

    async (c) => {
      const auth = getAuth(c);
      const id = c.req.query("id");

      if (!id) {
        return c.json({ error: "'id' is required" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const progress = await db
        .select({
          date: workoutSession.workoutDate,
          reps: workoutResults.reps,
          weight: workoutResults.weight,
        })
        .from(workoutResults)
        .innerJoin(
          workoutSession,
          eq(workoutResults.workoutSessionId, workoutSession.id)
        )
        .where(eq(workoutResults.exerciseId, +id))
        .orderBy(workoutSession.workoutDate);

      return c.json({ progress });
    }
  );

export default app;
