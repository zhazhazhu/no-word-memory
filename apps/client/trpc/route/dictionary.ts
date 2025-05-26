import { db, schemas } from '@no-word-memory/database';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

const dictionaries = protectedProcedure.input(z.object({ typeId: z.string() }).optional()).query(async ({ input }) => {
  const dictionary = await db.query.dictionaries.findMany({
    where: (posts, { eq }) => (input ? eq(posts.id, input.typeId) : undefined),
    with: {
      words: true,
    },
  });
  return dictionary;
});

const myDictionaries = protectedProcedure.query(async () => {
  const dictionary = await db.query.userDictionaries.findMany({
    with: {
      words: true,
    },
  });
  return dictionary;
});

const addDictionary = protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
  const exist = await db.query.userDictionaries.findFirst({ where: (posts, { eq }) => (eq(posts.dictionaryId, input)) });
  if (exist)
    throw new Error('字典已存在');

  const dictionary = await db.insert(schemas.userDictionaries).values({
    userId: ctx.session.id.toString(),
    dictionaryId: input,
  }).returning();
  return dictionary;
});

const dictionary = router({
  dictionaries,
  myDictionaries,
  addDictionary,
});

export { dictionary };
