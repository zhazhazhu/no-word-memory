import { relations } from 'drizzle-orm';
import { date, integer, pgEnum, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { words } from './dictionaries';
import { users } from './user';

export const learningRecordStatusEnum = pgEnum('learningRecordStatus', ['new', 'learning', 'mastered']);

export const learningRecords = pgTable('learning_records', {
  id: uuid().defaultRandom().primaryKey(),
  userId: text().notNull(),
  wordId: uuid().references(() => words.id),
  status: learningRecordStatusEnum().notNull(),
  reviewCount: integer().notNull().default(0),
  lastReviewedAt: timestamp(),
  nextReviewAt: date({ mode: 'string' }),
  createdAt: timestamp().defaultNow(),
}, t => [
  unique().on(t.userId, t.wordId),
]);

export const learningRecordRelations = relations(learningRecords, ({ one }) => ({
  word: one(words, {
    fields: [learningRecords.wordId],
    references: [words.id],
  }),
  user: one(users, {
    fields: [learningRecords.userId],
    references: [users.id],
  }),
}));
