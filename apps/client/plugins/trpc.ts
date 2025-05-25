import { trpc } from '@no-word-memory/api/client';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      trpc,
    },
  };
});
