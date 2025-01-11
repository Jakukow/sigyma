import { daysOfWeek } from "@/lib/utils";
import { db } from "@/src/drizzle";
import {
  exerciseBest,
  exercises,
  goalExercise,
  weekStreak,
  workoutResults,
  workoutSession,
} from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, desc, eq, gte } from "drizzle-orm";
import { subMonths } from "date-fns";

import { Hono } from "hono";

function getMondayOfCurrentWeek(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay() || 7;
  now.setDate(now.getDate() - dayOfWeek + 1);
  now.setHours(0, 0, 0, 0);
  return now;
}

function calculateWorkoutDays(lastWorkoutDate: Date | null): boolean[] {
  const weekDays = new Array(7).fill(false);
  if (!lastWorkoutDate) return weekDays;

  const startOfWeek = getMondayOfCurrentWeek();
  const workoutDate = new Date(lastWorkoutDate);

  if (workoutDate >= startOfWeek) {
    const dayIndex = workoutDate.getDay() === 0 ? 6 : workoutDate.getDay() - 1;
    weekDays[dayIndex] = true;
  }

  return weekDays;
}

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
  )
  .get(
    "/avg-progress",
    clerkMiddleware(),

    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401);
      }
      const oneMonthAgo = subMonths(new Date(), 1);

      const results = await db
        .select({
          exerciseId: workoutResults.exerciseId,
          weight: workoutResults.weight,
          workoutDate: workoutSession.workoutDate,
        })
        .from(workoutResults)
        .innerJoin(
          workoutSession,
          eq(workoutResults.workoutSessionId, workoutSession.id)
        )
        .where(gte(workoutSession.workoutDate, oneMonthAgo));

      if (!results.length) {
        return c.json({
          message: "No data available for the last month.",
          progress: 0,
        });
      }

      const groupedResults: Record<
        number,
        { initialWeight: number; finalWeight: number }
      > = {};
      for (const result of results) {
        const { exerciseId, weight } = result;
        if (!groupedResults[exerciseId]) {
          groupedResults[exerciseId] = {
            initialWeight: weight,
            finalWeight: weight,
          };
        }
        groupedResults[exerciseId].initialWeight = Math.min(
          groupedResults[exerciseId].initialWeight,
          weight
        );
        groupedResults[exerciseId].finalWeight = Math.max(
          groupedResults[exerciseId].finalWeight,
          weight
        );
      }

      const progressValues: number[] = Object.values(groupedResults).map(
        ({ initialWeight, finalWeight }) => {
          if (initialWeight === 0) return 0;
          return ((finalWeight - initialWeight) / initialWeight) * 100;
        }
      );

      const averageProgress =
        progressValues.reduce((acc, value) => acc + value, 0) /
        progressValues.length;

      return c.json({
        progress: averageProgress,
      });
    }
  )
  .get("/personal-bests", clerkMiddleware(), async (c) => {
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

      return c.json({ result: { exerciseName: "Bench Press", leaderBoard } });
    } else {
      const leaderBoard = await db
        .select()
        .from(exerciseBest)
        .where(eq(exerciseBest.exerciseId, goal[0].exerciseId))
        .orderBy(desc(exerciseBest.bestWeight));

      const exName = await db
        .select({ exerciseName: exercises.exName })
        .from(exercises)
        .where(eq(exercises.id, goal[0].exerciseId));

      return c.json({
        result: { exerciseName: exName[0].exerciseName, leaderBoard },
      });
    }
  })
  .get("/get-streak", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }
    const weekStart = getMondayOfCurrentWeek();

    const streakData = await db
      .select()
      .from(weekStreak)
      .where(
        and(
          eq(weekStreak.clerkId, auth.userId),
          eq(weekStreak.weekStart, weekStart)
        )
      )

      .limit(1);

    if (streakData.length === 0) {
      return c.json({ streakCount: 0, workoutDays: new Array(7).fill(false) });
    }

    const workoutDays = calculateWorkoutDays(streakData[0].lastWorkoutDate);
    return c.json({ streakCount: streakData[0].streakCount, workoutDays });
  })
  .post("/update-streak", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }
    const currentWeekStart = getMondayOfCurrentWeek();
    const workoutDateTime = new Date();

    const existingStreak = await db
      .select()
      .from(weekStreak)
      .where(eq(weekStreak.clerkId, auth.userId))
      .limit(1);

    if (existingStreak.length > 0) {
      const streakEntry = existingStreak[0];

      if (workoutDateTime >= currentWeekStart) {
        await db
          .update(weekStreak)
          .set({ lastWorkoutDate: workoutDateTime })
          .where(eq(weekStreak.clerkId, auth.userId));
        return c.json({ message: "Workout logged, no streak update." });
      }

      await db
        .update(weekStreak)
        .set({
          streakCount: streakEntry.streakCount + 1,
          lastWorkoutDate: workoutDateTime,
          weekStart: currentWeekStart,
        })
        .where(eq(weekStreak.clerkId, auth.userId));

      return c.json({ message: "Streak updated!" });
    } else {
      await db.insert(weekStreak).values({
        clerkId: auth.userId,
        weekStart: currentWeekStart,
        streakCount: 1,
        lastWorkoutDate: workoutDateTime,
      });

      return c.json({ message: "New streak started!" });
    }
  });

export default app;
