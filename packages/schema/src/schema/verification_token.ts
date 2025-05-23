import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

export const verificationTokens = pgTable('verification_token', {
  identifier: text('identifier').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  token: text('token').notNull(),
}, t => [
  primaryKey({ columns: [t.identifier, t.token] }),
]);
