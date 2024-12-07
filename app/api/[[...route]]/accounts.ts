import { db } from "@/src/drizzle";
import { insertAccountSchema, users } from "@/src/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";

import { Hono } from "hono";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "unauthorized" }, 401);
    }
    const accounts = await db
      .select({ id: users.id, name: users.username })
      .from(users);
    return c.json({ accounts });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ username: true })),
    async (c) => {
      const auth = getAuth(c);
      const { username } = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const [data] = await db
        .insert(users)
        .values({
          clerkId: auth.userId,

          username: username,
        })
        .returning();

      return c.json({ data });
    }
  );

export default app;
