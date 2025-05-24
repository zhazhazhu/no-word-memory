import { db, schemas } from '@no-word-memory/database';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

const list = publicProcedure.query(async () => {
  // Retrieve users from a datasource, this is an imaginary database
  const users = await db.query.users.findMany();

  return users;
});

const existByEmail = publicProcedure.input(z.string()).query(async ({ input }) => {
  const user = await db.query.users.findFirst({	where: (posts, { eq }) => (eq(posts.email, input)) });
  return Boolean(user);
});

const updateProfile = publicProcedure.input(z.object({
  id: z.number(),
  name: z.string().nullable(),
  image: z.string().nullable(),
})).mutation(async ({ input }) => {
  const user = await db.update(schemas.users).set({
    name: input.name,
    image: input.image,
  }).where(eq(schemas.users.id, input.id)).returning({ id: schemas.users.id });

  return user;
});

const user = router({
  list,
  existByEmail,
  updateProfile,
});

export { user };
