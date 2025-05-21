import type { AppRouter } from '../server';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8008',
    }),
  ],
});

export { trpc };
