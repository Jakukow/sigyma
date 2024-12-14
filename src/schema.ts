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

export const insertAccountSchema = createInsertSchema(users);
export const insertReviewsSchema = createInsertSchema(reviews);
export const insertMarkerSchema = createInsertSchema(markers);
export const insertExercisesSchema = createInsertSchema(exercises);
