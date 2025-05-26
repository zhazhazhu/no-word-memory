import { db, schemas } from '@no-word-memory/database';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

const dictionaries = protectedProcedure.query(async () => {
  const dictionary = await db.query.dictionaries.findMany({
    with: {
      words: true,
    },
  });
  return dictionary;
});

const dictionary = router({
  dictionaries,
});

export { dictionary };
