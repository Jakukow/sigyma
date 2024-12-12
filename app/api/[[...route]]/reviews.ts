import { db } from "@/src/drizzle";
import { insertReviewsSchema, markers, reviews } from "@/src/schema";
import { currentUser } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

import { Hono } from "hono";

const app = new Hono()
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertReviewsSchema.pick({
        atmosphere: true,
        body: true,
        cleanliness: true,
        comfort: true,
        equipment: true,
        markerId: true,
        overall: true,
        title: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const review = c.req.valid("json");
      const user = await currentUser();

      let username = user?.firstName;
      if (!username) {
        username = "Anonimous";
      }
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const [data] = await db
        .insert(reviews)
        .values({
          ...review,
          clerkName: username,
        })
        .returning();

      const [marker] = await db
        .select({ scores: markers.scores })
        .from(markers)
        .where(eq(markers.id, review.markerId));
      if (marker) {
        const updatedScores = [...(marker.scores || []), review.overall];
        await db
          .update(markers)
          .set({ scores: updatedScores })
          .where(eq(markers.id, review.markerId));
      }

      return c.json({ data });
    }
  )
  .get(
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

      const reviewList = await db
        .select()
        .from(reviews)
        .where(eq(reviews.markerId, +id));
      return c.json({ reviewList });
    }
  );

export default app;
