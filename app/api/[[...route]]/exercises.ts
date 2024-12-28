import { db } from "@/src/drizzle";
import { exercises, insertExercisesSchema } from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq, or } from "drizzle-orm";

import { Hono } from "hono";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }

    const id = c.req.query("id");
    if (id) {
      const [exercise] = await db
        .select()
        .from(exercises)
        .where(
          and(eq(exercises.clerkId, auth.userId), eq(exercises.id, Number(id)))
        );
      return c.json({ exercise });
    }

    const exercisesList = await db
      .select()
      .from(exercises)
      .where(
        or(eq(exercises.clerkId, auth.userId), eq(exercises.clerkId, "DEFAULT"))
      );
    return c.json({ exercisesList });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertExercisesSchema.pick({
        exDesc: true,
        exName: true,
        exUnit: true,
      })
    ),
    async (c) => {
      const exercise = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(exercises)
        .values({
          ...exercise,
          clerkId: auth.userId,
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/delete-exercise",
    clerkMiddleware(),
    zValidator(
      "json",
      insertExercisesSchema.pick({
        id: true,
        clerkId: true,
      })
    ),
    async (c) => {
      const exercise = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!exercise.id) {
        return c.json({ error: "Invalid exercise ID" }, 400);
      }

      const deletedExercise = await db
        .delete(exercises)
        .where(
          and(eq(exercises.clerkId, auth.userId), eq(exercises.id, exercise.id))
        )
        .returning();

      return c.json({
        data: deletedExercise,
        message: "Exercise deleted successfully",
      });
    }
  )
  .post(
    "/edit-exercise",
    clerkMiddleware(),
    zValidator(
      "json",
      insertExercisesSchema.pick({
        exDesc: true,
        exName: true,
        exUnit: true,
        id: true,
      })
    ),
    async (c) => {
      const exercise = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!exercise.id) {
        return c.json({ error: "Invalid exercise ID" }, 400);
      }

      const editedExercise = await db
        .update(exercises)
        .set({
          exDesc: exercise.exDesc,
          exName: exercise.exName,
          exUnit: exercise.exUnit,
        })
        .where(
          and(eq(exercises.id, exercise.id), eq(exercises.clerkId, auth.userId))
        );

      return c.json({
        data: editedExercise,
        message: "Exercise edited successfully",
      });
    }
  )
  .get("/default", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }

    const exercisesList = await db
      .select()
      .from(exercises)
      .where(eq(exercises.clerkId, "DEFAULT"));
    return c.json({ exercisesList });
  });

export default app;
