import { db } from "@/src/drizzle";
import { exerciseBest, goalExercise } from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { and, desc, eq } from "drizzle-orm";

import { Hono } from "hono";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ error: "unauthorized" }, 401);
  }

  const goal = await db
    .select()
    .from(goalExercise)
    .where(
      and(eq(goalExercise.clerkId, auth.userId), eq(goalExercise.order, 1))
    );
  if (!goal.length) {
    const leaderBoard = await db
      .select()
      .from(exerciseBest)
      .where(eq(exerciseBest.exerciseId, 4124124))
      .orderBy(desc(exerciseBest.bestWeight));
    return c.json({ leaderBoard });
  } else {
    const leaderBoard = await db
      .select()
      .from(exerciseBest)
      .where(eq(exerciseBest.exerciseId, goal[0].exerciseId))
      .orderBy(desc(exerciseBest.bestWeight));
    return c.json({ leaderBoard });
  }
});

export default app;
