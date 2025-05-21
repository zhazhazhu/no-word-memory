import { db, schemas } from '@no-word-memory/database';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

const list = publicProcedure.query(async () => {
  // Retrieve users from a datasource, this is an imaginary database
  const users = await db.select().from(schemas.users).all();

  return users;
});

const exist = publicProcedure.input(z.string()).query(async ({ input }) => {
  const user = await db.query.users.findFirst({	where: (posts, { eq }) => (eq(posts.id, input)) });
  return Boolean(user)
});

const user = router({
  list,
  exist
});

export { user };
