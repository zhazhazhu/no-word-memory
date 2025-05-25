import process from 'node:process';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { db } from './db';

async function main() {
  console.log('Running your migrations...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Woohoo! Migrations completed!');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    process.exit();
  });
