import { db } from "@/src/drizzle";
import { insertMarkerSchema, markers } from "@/src/schema";
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
      insertMarkerSchema.pick({
        gymAdress: true,
        gymName: true,
        lat: true,
        lng: true,
      })
    ),
    async (c) => {
      console.log("dasda");
      const auth = getAuth(c);
      const marker = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const [data] = await db
        .insert(markers)
        .values({
          ...marker,
          clerkId: auth.userId,
        })
        .returning();

      return c.json({ data });
    }
  )
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }
    const markerList = await db.select().from(markers);
    return c.json({ markerList });
  })
  .delete(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertMarkerSchema.pick({
        id: true,
      })
    ),
    async (c) => {
      const marker = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!marker.id) {
        return c.json({ error: "Invalid marker ID" }, 400);
      }

      const [existingMarker] = await db
        .select()
        .from(markers)
        .where(eq(markers.id, marker.id));

      if (!existingMarker) {
        return c.json({ error: "Marker not found" }, 404);
      }

      if (existingMarker.clerkId !== auth.userId) {
        return c.json({ error: "You are not the owner of this marker" }, 403);
      }

      const deletedMarker = await db
        .delete(markers)
        .where(eq(markers.id, marker.id))
        .returning();

      return c.json({
        data: deletedMarker,
        message: "Marker deleted successfully",
      });
    }
  );

export default app;
