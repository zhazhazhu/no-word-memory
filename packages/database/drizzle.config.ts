import path from 'node:path';
import process from 'node:process';
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('process.env.DATABASE_URL: ', process.env.DATABASE_URL);

export default defineConfig({
  schema: '../schema/src/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
});
