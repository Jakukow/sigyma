import { db } from "@/src/drizzle";
import { insertReviewsSchema, markers, reviews } from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

import { Hono } from "hono";

const app = new Hono().post(
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

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const [data] = await db
      .insert(reviews)
      .values({
        ...review,
        clerkId: auth.userId,
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
);

export default app;
