import { calculate1RM } from "@/lib/utils";
import { db } from "@/src/drizzle";
import {
  exerciseBest,
  exercises,
  goalExercise,
  insertWorkoutResultsSchema,
  insertWorkoutSessionSchema,
  trainingPlans,
  workoutResults,
  workoutSession,
} from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, sql } from "drizzle-orm";

import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
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

        for (const result of results) {
          const { exerciseId, weight, reps } = result;
          const calculated1RM =
            reps !== undefined && reps !== null
              ? calculate1RM(weight, reps)
              : weight;

          const [currentBest] = await db
            .select()
            .from(exerciseBest)
            .where(
              and(
                eq(exerciseBest.exerciseId, exerciseId),
                eq(exerciseBest.clerkId, auth.userId)
              )
            )
            .limit(1);

          if (!currentBest) {
            await db.insert(exerciseBest).values({
              weight: weight,
              reps: reps,
              clerkId: auth.userId,
              exerciseId,
              bestWeight: calculated1RM,
              achievedAt: new Date(),
            });
          } else if (calculated1RM > currentBest.bestWeight) {
            await db
              .update(exerciseBest)
              .set({
                weight: weight,
                reps: reps,
                bestWeight: calculated1RM,
                achievedAt: new Date(),
              })
              .where(
                and(
                  eq(exerciseBest.exerciseId, exerciseId),
                  eq(exerciseBest.clerkId, auth.userId)
                )
              );
          }

          const [currentGoal] = await db
            .select()
            .from(goalExercise)
            .where(
              and(
                eq(goalExercise.exerciseId, exerciseId),
                eq(goalExercise.clerkId, auth.userId)
              )
            )
            .limit(1);

          const updatedBestWeight =
            calculated1RM > (currentBest?.bestWeight || 0)
              ? calculated1RM
              : currentBest?.bestWeight || 0;

          if (currentGoal) {
            await db
              .update(goalExercise)
              .set({
                actualweight: updatedBestWeight,
              })
              .where(
                and(
                  eq(goalExercise.exerciseId, exerciseId),
                  eq(goalExercise.clerkId, auth.userId)
                )
              );
          }
        }

        return c.json({ data: { session, results: insertedResults } });
      } catch (error) {
        console.error("Error processing workout submission:", error);
        return c.json({ error: "Internal server error" }, 500);
      }
    }
  )
  .get(
    "/get-latest-results",
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

      const sesions = await db
        .select()
        .from(workoutSession)
        .where(eq(workoutSession.trainingId, +id))
        .orderBy(desc(workoutSession.workoutDate));
      if (!sesions.length) {
        return c.json({ exerciseList: [] });
      }

      const exerciseList = await db
        .select()
        .from(workoutResults)
        .where(eq(workoutResults.workoutSessionId, sesions[0].id));

      return c.json({ exerciseList });
    }
  )
  .get("/training-history", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      const sessions = await db
        .select({
          id: workoutSession.id,
          workoutDate: workoutSession.workoutDate,
          planName: trainingPlans.planName,
        })
        .from(workoutSession)
        .where(eq(workoutSession.clerkId, auth.userId))
        .leftJoin(
          trainingPlans,
          eq(workoutSession.trainingId, trainingPlans.id)
        )
        .orderBy(desc(workoutSession.workoutDate));

      if (!sessions.length) {
        return c.json({ sessions: [] });
      }

      const sessionsWithDetails = await Promise.all(
        sessions.map(async (session) => {
          const exerciseSummary = await db
            .select({
              exerciseId: workoutResults.exerciseId,
              exerciseName: exercises.exName,
              totalSets: sql<number>`COUNT(${workoutResults.setNumber})`,
            })
            .from(workoutResults)
            .where(eq(workoutResults.workoutSessionId, session.id))
            .leftJoin(exercises, eq(workoutResults.exerciseId, exercises.id))
            .groupBy(workoutResults.exerciseId, exercises.exName);

          const detailedExercises = await Promise.all(
            exerciseSummary.map(async (exercise) => {
              const seriesDetails = await db
                .select({
                  setNumber: workoutResults.setNumber, // Poprawiona nazwa kolumny
                  reps: workoutResults.reps,
                  weight: workoutResults.weight,
                })
                .from(workoutResults)
                .where(
                  and(
                    eq(workoutResults.workoutSessionId, session.id),
                    eq(workoutResults.exerciseId, exercise.exerciseId)
                  )
                )
                .orderBy(workoutResults.setNumber); // Poprawiona nazwa kolumny

              return { ...exercise, series: seriesDetails };
            })
          );

          return {
            id: session.id,
            name: session.planName,
            date: session.workoutDate,
            exercises: detailedExercises,
          };
        })
      );

      return c.json({ sessions: sessionsWithDetails });
    } catch (error) {
      console.error("Error fetching training history:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  })
  .post(
    "/delete-session",
    clerkMiddleware(),
    zValidator(
      "json",
      insertWorkoutSessionSchema.pick({
        id: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401);
      }
      const { id } = c.req.valid("json");

      if (!id) {
        return c.json({ error: "'id' is required" }, 400);
      }
      await db
        .delete(workoutSession)
        .where(
          and(
            eq(workoutSession.id, +id),
            eq(workoutSession.clerkId, auth.userId)
          )
        );
      return c.json({ message: "Session deleted" });
    }
  );

export default app;
