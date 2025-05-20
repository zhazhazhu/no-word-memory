// apps/client/server/api/users.ts
import { db } from '@no-word-memory/db';
import { usersTable } from '@no-word-memory/schema';

export default defineEventHandler(async () => {
  const result = await db.select().from(usersTable).all();
  return result;
});
