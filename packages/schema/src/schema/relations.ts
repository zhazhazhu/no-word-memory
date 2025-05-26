import { relations } from 'drizzle-orm';
import { dictionaries, words } from './dictionaries';

export const dictionaryRelations = relations(dictionaries, ({ many }) => ({
  words: many(words),
}));

export const wordRelations = relations(words, ({ one }) => ({
  dictionary: one(dictionaries, {
    fields: [words.dictionaryId],
    references: [dictionaries.id],
  }),
}));
