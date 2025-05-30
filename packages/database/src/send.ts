import type { InsertWord } from '@no-word-memory/schema';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { db, schemas } from '@no-word-memory/database';
import { parse as csvParse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import category from '../meta/category.json';
import dictionary from '../meta/dictionary.json';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

export async function send() {
  db.delete(schemas.dictionaries);
  db.delete(schemas.categories);
  db.delete(schemas.words);

  await db.insert(schemas.categories).values(category.categories).returning();
  console.log('Create categories successfully!');
  const metaRootPath = path.resolve(process.cwd(), './meta');

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
      const words: InsertWord[] = await csvParse(wordsCsv, { columns: true });

      await db.insert(schemas.words).values(words.map(word => ({
        ...word,
        dictionaryId: dictionary.id,
      })));
    }
    console.log('Create words successfully!');
  }

  console.log('Send data successfully!');
  process.exit(0);
}

send();
