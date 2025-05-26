import { bigint, pgTable, primaryKey, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId').notNull(), // ✅ 改为 uuid
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  sessionToken: varchar('sessionToken', { length: 255 }).notNull(),
});

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId').notNull(), // ✅ 改为 uuid
  type: varchar('type', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: bigint({ mode: 'number' }),
  id_token: text('id_token'),
  scope: text('scope'),
  session_state: text('session_state'),
  token_type: text('token_type'),
});

export const verificationTokens = pgTable('verification_token', {
  identifier: text('identifier').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  token: text('token').notNull(),
}, t => [
  primaryKey({ columns: [t.identifier, t.token] }),
]);
