import type { InferInsertModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const dictionaries = pgTable('dictionaries', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp().defaultNow(),
});

export type InsertDictionary = InferInsertModel<typeof dictionaries>;

export const words = pgTable('words', {
  id: uuid().defaultRandom().primaryKey(),
  dictionaryId: uuid()
    .notNull()
    .references(() => dictionaries.id, { onDelete: 'cascade' }),
  word: text().notNull(),
  pronunciation: text(),
  createdAt: timestamp().defaultNow(),
});

export type InsertWord = InferInsertModel<typeof words>;

export const definitions = pgTable('definitions', {
  id: uuid().defaultRandom().primaryKey(),
  wordId: uuid()
    .notNull()
    .references(() => words.id, { onDelete: 'cascade' }),
  partOfSpeech: text(), // 例如：noun / verb
  meaning: text(),
  example: text(),
});

export type InsertDefinition = InferInsertModel<typeof definitions>;

export const userDictionaries = pgTable('user_dictionaries', {
  id: uuid().defaultRandom().primaryKey(),
  userId: text().notNull(), // next-auth 的 user.id
  dictionaryId: uuid().references(() => dictionaries.id),
  selectedAt: timestamp().defaultNow(),
});

export type InsertUserDictionary = InferInsertModel<typeof userDictionaries>;
