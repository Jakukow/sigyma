import { pgTable, serial, text } from "drizzle-orm/pg-core";
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
  lat: text("lat").notNull(),
  lng: text("lng").notNull(),
});

export const insertAccountSchema = createInsertSchema(users);
export const insertMarkerSchema = createInsertSchema(markers);
