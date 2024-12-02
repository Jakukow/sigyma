import { Hono } from "hono";
import { users } from "@/src/schema";
import { db } from "@/src/drizzle";

const app = new Hono();

const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!clerkWebhookSecret) {
  throw new Error("CLERK_WEBHOOK_SECRET is not defined in .env file");
}
