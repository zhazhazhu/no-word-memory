import { db, schemas } from '@no-word-memory/database';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

const dictionaries = protectedProcedure.query(async () => {
  const words = await db.query.dictionaries.findMany();
  return words;
});

const dictionary = router({
  dictionaries,
});

export { dictionary };
