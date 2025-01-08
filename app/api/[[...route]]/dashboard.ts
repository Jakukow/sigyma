import { daysOfWeek } from "@/lib/utils";
import { db } from "@/src/drizzle";
import { goalExercise, workoutSession } from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq } from "drizzle-orm";

import { Hono } from "hono";

const app = new Hono()
  .get(
    "/training-intensity",
    clerkMiddleware(),

    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const dateList = await db
        .select({ workoutDate: workoutSession.workoutDate })
        .from(workoutSession)
        .where(eq(workoutSession.clerkId, auth.userId));

      const dayCounts = daysOfWeek.reduce((acc, _, index) => {
        acc[index] = 0;
        return acc;
      }, {} as Record<number, number>);

      dateList.forEach(({ workoutDate }) => {
        const day = workoutDate.getDay();
        dayCounts[day] += 1;
      });

      const result = Object.entries(dayCounts).map(([day, count]) => ({
        day: daysOfWeek[Number(day)],
        count,
      }));

      return c.json({ result });
    }
  )
  .get(
    "/main-goal",
    clerkMiddleware(),

    async (c) => {
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
      return c.json({ goal });
    }
  );

export default app;
