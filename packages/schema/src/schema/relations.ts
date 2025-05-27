import { relations } from 'drizzle-orm';
import { categories, dictionaries, dictionaryCategoryRelations, words } from './dictionaries';

export const dictionaryRelations = relations(dictionaries, ({ many }) => ({
  words: many(words),
  categories: many(dictionaryCategoryRelations),
}));

export const wordRelations = relations(words, ({ one }) => ({
  dictionary: one(dictionaries, {
    fields: [words.dictionaryId],
    references: [dictionaries.id],
  }),
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
