import { publicProcedure } from '../trpc';
import { db,schemas } from '@no-word-memory/database';

const userList =  publicProcedure.query(async () => {
  // Retrieve users from a datasource, this is an imaginary database
  const users = await db.select().from(schemas.usersTable).all();

  return users;
})

export { userList };