import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const dictionaries = pgTable('dictionaries', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  coverIcon: text(),
  coverImage: text(),
  description: text(),
  createdAt: timestamp().defaultNow(),
});

export type InsertDictionary = InferInsertModel<typeof dictionaries>;

export type Dictionary = InferSelectModel<typeof dictionaries>;

export const categories = pgTable('dictionary_categories', {
  id: uuid().defaultRandom().primaryKey(),
  code: text().unique().notNull(),
  icon: text(),
  name: text().notNull(),
});

export const dictionaryCategoryRelations = pgTable('dictionary_category_relations', {
  dictionaryId: uuid()
    .references(() => dictionaries.id, { onDelete: 'cascade' }),
  categoryCode: text().references(() => categories.code, { onDelete: 'cascade' }),
}, t => [
  primaryKey({ columns: [t.dictionaryId, t.categoryCode] }),
]);

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
    .references(() => words.id),
  partOfSpeech: text(), // 例如：noun / verb
  meaning: text(),
  example: text(),
});

export type InsertDefinition = InferInsertModel<typeof definitions>;

export const userDictionaries = pgTable('user_dictionaries', {
  id: uuid().defaultRandom().primaryKey(),
  userId: text().notNull(), // next-auth 的 user.id
  dictionaryId: uuid()
    .notNull()
    .references(() => dictionaries.id, { onDelete: 'cascade' }),
  selectedAt: timestamp().defaultNow(),
});

export type InsertUserDictionary = InferInsertModel<typeof userDictionaries>;
