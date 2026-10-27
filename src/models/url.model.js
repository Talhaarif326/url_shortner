import { pgTable, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "../models/index.js";

export const urlsTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),

  originalUrl: text("original_url").notNull(),
  shortCode: varchar("short_code", { length: 255 }).notNull().unique(),

  userId: uuid().references(() => usersTable.id),

  createdAt: timestamp("time").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
