import type { ECdictWord, Word } from './types/meta';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { db, schemas } from '@no-word-memory/database';
import { parse as csvParse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import category from '../meta/category.json';
import dictionary from '../meta/dictionary.json';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

async function sendECdictWord() {
  const metaRootPath = path.resolve(process.cwd(), './meta');
  const ecdictPath = path.resolve(metaRootPath, './word/ecdict.csv');
  console.log(ecdictPath);

  const ecdictCsv = await fs.readFileSync(ecdictPath, 'utf-8');
  const words: ECdictWord[] = await csvParse(ecdictCsv, { columns: true });
  for (const row of words) {
    const existingWord = await db.query.words.findFirst({
      where: (w, { eq }) => eq(w.word, row.word),
    });

    let wordId: string;
    if (existingWord) {
      wordId = existingWord.id;
    }
    else {
      const [newWord] = await db.insert(schemas.words).values({
        word: row.word,
        pronunciation: row.phonetic,
      }).returning();
      wordId = newWord.id;
    }

    await db.insert(schemas.definitions).values({
      wordId,
      partOfSpeech: row.phonetic,
      meaning: row.translation,
      example: '',
    });
  }
}

async function main() {
  await db.insert(schemas.categories).values(category.categories).returning();
  console.log('Create categories successfully!');
  const metaRootPath = path.resolve(process.cwd(), './meta');

  await sendECdictWord();
  console.log('Create words successfully!');

  for (const element of dictionary.dictionaries) {
    const [dictionary] = await db.insert(schemas.dictionaries).values({
      name: element.name,
      description: element.description,
      coverIcon: element.coverIcon,
    }).returning();

    await db.insert(schemas.dictionaryCategoryRelations).values({
      dictionaryId: dictionary.id,
      categoryCode: element.categoryCode,
    });
    console.log('Create dictionary successfully!');

    if (element.wordsPath) {
      const wordsPath = path.resolve(metaRootPath, element.wordsPath);
      console.log(wordsPath);

      const wordsCsv = await fs.readFileSync(wordsPath, 'utf-8');
      const words: Word[] = await csvParse(wordsCsv, { columns: true });

      for (const row of words) {
        const existingWord = await db.query.words.findFirst({
          where: (w, { eq, and }) =>
            and(eq(w.word, row.word), eq(w.dictionaryId, dictionary.id)),
        });

        let wordId: string;
        if (existingWord) {
          wordId = existingWord.id;
        }
        else {
          const [newWord] = await db.insert(schemas.words).values({
            word: row.word,
            pronunciation: row.pronunciation,
            dictionaryId: dictionary.id,
          }).returning();
          wordId = newWord.id;
        }

        await db.insert(schemas.definitions).values({
          wordId,
          partOfSpeech: row.part_of_speech,
          meaning: row.meaning,
          example: row.example,
        });
      }
    }
  }

  console.log('Send data successfully!');
  process.exit(0);
}

main();
