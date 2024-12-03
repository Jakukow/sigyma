import { db } from "@/src/drizzle";
import { users } from "@/src/schema";
import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  const accounts = db
    .select({ id: users.id, name: users.username })
    .from(users);
  return c.json({ accounts });
});

export default app;
