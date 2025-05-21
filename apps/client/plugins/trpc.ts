import { trpc } from '@no-word-memory/api';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      trpc,
    },
  };
});
