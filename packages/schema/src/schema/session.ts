import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('userId').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  sessionToken: varchar('sessionToken', { length: 255 }).notNull(),
});
