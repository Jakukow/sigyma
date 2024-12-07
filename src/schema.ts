import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("user_id").notNull(),
  username: text("username"),
});

export const insertAccountSchema = createInsertSchema(users);
