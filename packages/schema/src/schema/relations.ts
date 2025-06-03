import { relations } from 'drizzle-orm';
import { categories, definitions, dictionaries, dictionaryCategoryRelations, userDictionaries, words } from './dictionaries';

export const dictionaryRelations = relations(dictionaries, ({ many }) => ({
  words: many(words),
  categories: many(dictionaryCategoryRelations),
  userDictionaries: many(userDictionaries),
}));

export const wordRelations = relations(words, ({ one, many }) => ({
  dictionary: one(dictionaries, {
    fields: [words.dictionaryId],
    references: [dictionaries.id],
  }),
  definitions: many(definitions),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  dictionaries: many(dictionaryCategoryRelations),
}));

export const dictionaryCategoryRelationRelations = relations(dictionaryCategoryRelations, ({ one }) => ({
  dictionary: one(dictionaries, {
    fields: [dictionaryCategoryRelations.dictionaryId],
    references: [dictionaries.id],
  }),
  category: one(categories, {
    fields: [dictionaryCategoryRelations.categoryCode],
    references: [categories.code],
  }),
}));

export const userDictionaryRelations = relations(userDictionaries, ({ one }) => ({
  dictionary: one(dictionaries, {
    fields: [userDictionaries.dictionaryId],
    references: [dictionaries.id],
  }),
}));

export const definitionsRelations = relations(definitions, ({ one }) => ({
  word: one(words, {
    fields: [definitions.wordId],
    references: [words.id],
  }),
}));
