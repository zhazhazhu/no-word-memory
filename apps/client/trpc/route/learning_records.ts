import { db, schemas } from '@no-word-memory/database';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { getNextReviewDate, getTodayDate } from '../helper';
import { protectedProcedure, router } from '../trpc';

const reviewInput = z.object({
  wordId: z.string(),
  remembered: z.boolean(),
});

export const review = protectedProcedure.input(reviewInput).mutation(async ({ input, ctx }) => {
  const userId = ctx.session.id;
  const now = new Date();

  const existing = await db.query.learningRecords.findFirst({
    where: (r, { and, eq }) =>
      and(eq(r.userId, userId), eq(r.wordId, input.wordId)),
  });
  if (!existing) {
    // 新建
    await db.insert(schemas.learningRecords).values({
      userId,
      wordId: input.wordId,
      reviewCount: input.remembered ? 1 : 0,
      lastReviewedAt: now,
      nextReviewAt: getNextReviewDate(input.remembered ? 1 : 0),
      status: 'new',
    });
    return { created: true };
  }

  if (input.remembered) {
    const newCount = existing.reviewCount + 1;
    await db.update(schemas.learningRecords)
      .set({
        reviewCount: newCount,
        lastReviewedAt: now,
        nextReviewAt: getNextReviewDate(newCount),
        status: 'learning',
      })
      .where(and(eq(schemas.learningRecords.userId, userId), eq(schemas.learningRecords.wordId, input.wordId)));
  }
  else {
    await db.update(schemas.learningRecords)
      .set({
        reviewCount: 0,
        lastReviewedAt: now,
        nextReviewAt: getNextReviewDate(0),
        status: 'learning',
      })
      .where(and(eq(schemas.learningRecords.userId, userId), eq(schemas.learningRecords.wordId, input.wordId)));
  }

  return { updated: true };
});

export const today = protectedProcedure
  .query(async ({ ctx }) => {
    const userId = ctx.session.id;
    const today = getTodayDate();

    return await db.query.learningRecords.findMany({
      where: (r, { and, eq, lte }) =>
        and(eq(r.userId, userId), lte(r.nextReviewAt, today)),
      with: {
        word: true,
      },
    });
  });

const learning_records = router({
  review,
  today,
});

export { learning_records };
