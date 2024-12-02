//import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { Hono } from "hono";
import { handle } from "hono/vercel";
import webhooks from "./webhooks";
export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/webhooks", webhooks);

export const GET = handle(app);
export const POST = handle(app);
