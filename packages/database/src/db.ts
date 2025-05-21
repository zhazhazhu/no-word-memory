import process from 'node:process';
import { createClient } from '@libsql/client';
import * as schemas from '@no-word-memory/schema';
import { drizzle } from 'drizzle-orm/libsql';
import 'dotenv/config';

const client = createClient({ url: process.env.DB_FILE_NAME ?? '' });
const db = drizzle(client, { schema: schemas });

export { db, schemas };
