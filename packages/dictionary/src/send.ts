import type { InsertWord } from '@no-word-memory/schema';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { db, schemas } from '@no-word-memory/database';
import { parse as csvParse } from 'csv-parse/sync';
import 'dotenv/config';

export async function send() {
  db.delete(schemas.dictionaries);
  db.delete(schemas.words);

  const [{ id: newConcept1Id }] = await db.insert(schemas.dictionaries).values({
    name: '新概念英语1',
    description: '新概念英语1',
  }).returning();

  const newConceptWordPath = path.resolve(process.cwd(), './meta/new-concept-1.csv');
  const newConceptWordCsv = await fs.readFileSync(newConceptWordPath, 'utf-8');
  const newConceptWord: InsertWord[] = await csvParse(newConceptWordCsv, { columns: true });
  console.log(newConceptWord.length);

  await db.insert(schemas.words).values(newConceptWord.map(word => ({
    ...word,
    dictionaryId: newConcept1Id,
  })));

  console.log('Create dictionaries successfully!');
  process.exit(0);
}

send();
