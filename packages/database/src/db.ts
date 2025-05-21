import path from 'node:path';
import process from 'node:process';
import { createClient } from '@libsql/client';
import * as schemas from '@no-word-memory/schema';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';

dotenv.config({ path: path.resolve(__dirname, `../../../apps/api/.env`) });

console.log('connection string: ', process.env.DB_FILE_NAME);

const client = createClient({ url: process.env.DB_FILE_NAME ?? '' });
const db = drizzle(client, { schema: schemas });

export { db, schemas };
