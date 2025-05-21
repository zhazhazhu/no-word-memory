import { db, schemas } from '@no-word-memory/database';
import { publicProcedure, router } from '../trpc';

const list = publicProcedure.query(async () => {
  // Retrieve users from a datasource, this is an imaginary database
  const users = await db.select().from(schemas.usersTable).all();

  return users;
});

const user = router({
  list,
});

export { user };
