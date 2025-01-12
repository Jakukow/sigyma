import {
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  username: text("username"),
});

export const markers = pgTable("markers", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  gymName: text("gym_name").notNull(),
  gymAdress: text("gym_adress").notNull(),
  gymCity: text("gym_city").notNull(),
  lat: text("lat").notNull(),
  lng: text("lng").notNull(),
  scores: real("scores").array().default([]),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  markerId: integer("marker_id")
    .notNull()
    .references(() => markers.id, { onDelete: "cascade" }),
  clerkName: text("user_name").notNull(),
  title: text("review_title").notNull(),
  body: text("review_body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  comfort: integer("comfort_score").notNull(),
  cleanliness: integer("clean_score").notNull(),
  equipment: integer("eq_score").notNull(),
  atmosphere: integer("atmosphere_score").notNull(),
  overall: real("overall_score").notNull(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  exName: text("exercise_name").notNull(),
  exDesc: text("exercise_description").notNull(),
  exUnit: text("exercise_unit").notNull(),
});

export const trainingPlans = pgTable("trainingplans", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  planName: text("plan_name").notNull(),
  dayOfWeek: text("day_week").notNull(),
});

export const trainingPlanExercises = pgTable("trainingplan_exercises", {
  id: serial("id").primaryKey(),
  trainingPlanId: integer("training_plan_id")
    .notNull()
    .references(() => trainingPlans.id, { onDelete: "cascade" }),
  exerciseName: text("ex-name").notNull(),
  exercisesUnit: text("unit").notNull(),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  seriesNumber: integer("series_number").notNull(),
  order: integer("order").notNull(),
});

export const workoutSession = pgTable("workout_session", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  workoutDate: timestamp("workout_date").defaultNow().notNull(),
  trainingId: integer("training_id")
    .notNull()
    .references(() => trainingPlans.id, { onDelete: "cascade" }),
});

export const workoutResults = pgTable("workout_results", {
  id: serial("id").primaryKey(),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  workoutSessionId: integer("workout_session_id")
    .notNull()
    .references(() => workoutSession.id, { onDelete: "cascade" }),
  setNumber: integer("set_number").notNull(),
  reps: integer("reps"),
  weight: real("weight").notNull(),
});

export const exerciseBest = pgTable("exercise_best", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),

  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  bestWeight: real("best_weight").notNull(),
  weight: real("weigh").notNull(),
  reps: integer("reps"),
  achievedAt: timestamp("achieved_at").defaultNow().notNull(),
});

export const goalExercise = pgTable("goal-exercise", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),

  weight: real("weigh").notNull(),
  unit: text("unit").notNull(),
  exerciseName: text("ex-name").notNull(),
  reps: integer("reps"),
  color: text("color").notNull(),
  order: integer("order").notNull(),
  actualweight: real("actual_weight"),
});

export const weekStreak = pgTable("week_streak", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  weekStart: timestamp("week_start").defaultNow().notNull(),
  streakCount: integer("streak_count").default(1).notNull(),
  lastWorkoutDate: timestamp("last_workout_date"),
});

export const insertWorkoutResultsSchema = createInsertSchema(workoutResults);
export const insertGoalsSchema = createInsertSchema(goalExercise);
export const insertAccountSchema = createInsertSchema(users);
export const insertTrainingPlansSchema = createInsertSchema(trainingPlans);
export const insertPlanExeciseSchema = createInsertSchema(
  trainingPlanExercises
);
export const insertWorkoutSessionSchema = createInsertSchema(workoutSession);
export const insertGoalSchema = createInsertSchema(goalExercise);
export const insertReviewsSchema = createInsertSchema(reviews);
export const insertMarkerSchema = createInsertSchema(markers);
export const insertExercisesSchema = createInsertSchema(exercises);
