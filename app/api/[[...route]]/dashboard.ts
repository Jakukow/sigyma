import { db } from "@/src/drizzle";
import { reviews } from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";

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

    const reviewList = await db
      .select()
      .from(reviews)
      .where(eq(reviews.markerId, +id));
    return c.json({ reviewList });
  }
);

export default app;
