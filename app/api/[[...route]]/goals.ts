import { db } from "@/src/drizzle";
import { goalExercise, insertGoalsSchema } from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { count, eq } from "drizzle-orm";

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
      })
    ),
    async (c) => {
      const exercise = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const [counts] = await db.select({ count: count() }).from(goalExercise);

      const [data] = await db
        .insert(goalExercise)
        .values({
          ...exercise,
          clerkId: auth.userId,
          order: counts.count + 1,
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
        .where(eq(goalExercise.clerkId, auth.userId));

      return c.json({ goalsList });
    }
  );

export default app;
