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
  );

export default app;
