import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users_table', {
  id: text().primaryKey().default(sql`gen_random_uuid()`),
  name: text().notNull(),
  email: text().notNull(),
  avatar: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
