import { pgTable, serial, varchar, jsonb, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  auth0_id: varchar("auth0_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  preferences: jsonb("preferences"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const integrations = pgTable("integrations", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  provider: varchar("provider", { length: 255 }),
  access_token: varchar("access_token", { length: 255 }),
  refresh_token: varchar("refresh_token", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})