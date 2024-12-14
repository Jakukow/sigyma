import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import markers from "./markers";
import reviews from "./reviews";
import exercises from "./exercises";
export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/accounts", accounts)
  .route("/markers", markers)
  .route("/reviews", reviews)
  .route("/exercises", exercises);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
