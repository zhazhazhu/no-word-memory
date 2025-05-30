import path from 'node:path';
import process from 'node:process';
import * as schemas from '@no-word-memory/schema';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

console.log('connection string: ', process.env.DATABASE_URL);

const client = postgres(process.env.DATABASE_URL ?? '');
const db = drizzle(client, { schema: schemas });

export { db, schemas };
