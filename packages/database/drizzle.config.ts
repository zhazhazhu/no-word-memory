import path from 'node:path';
import process from 'node:process';
import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: path.resolve(__dirname, '../../apps/api/.env') });

console.log('process.env.DB_FILE_NAME: ', process.env.DB_FILE_NAME);

export default defineConfig({
  schema: '../schema/src/schema/*',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME ?? '',
  },
});
