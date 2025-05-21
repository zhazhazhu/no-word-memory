import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users_table', {
  id: text().primaryKey().$defaultFn(() => sql`uuid_generate_v4()`),
  name: text().notNull(),
  email: text().notNull(),
  avatar: text().notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
