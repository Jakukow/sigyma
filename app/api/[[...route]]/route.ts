import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import markers from "./markers";
import reviews from "./reviews";
import exercises from "./exercises";
import planlist from "./planlist";
import workout from "./workout";
import progress from "./progress";
import bestExercise from "./personal-bests";
import goals from "./goals";
import dashboard from "./dashboard";
export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/accounts", accounts)
  .route("/markers", markers)
  .route("/reviews", reviews)
  .route("/exercises", exercises)
  .route("/planlist", planlist)
  .route("/workout", workout)
  .route("/progress", progress)
  .route("/best-exercise", bestExercise)
  .route("/goals", goals)
  .route("/dashboard", dashboard);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
