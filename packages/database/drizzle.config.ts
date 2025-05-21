import process from 'node:process';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: '../schema/src/schema/*',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME ?? '',
  },
});
