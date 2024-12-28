import { db } from "@/src/drizzle";
import { exerciseBest } from "@/src/schema";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { desc, eq } from "drizzle-orm";

import { Hono } from "hono";

const app = new Hono().get(
  "/",
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
      .from(exerciseBest)
      .where(eq(exerciseBest.exerciseId, +id))
      .orderBy(desc(exerciseBest.bestWeight));
    return c.json({ exerciseList });
  }
);

export default app;
