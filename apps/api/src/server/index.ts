import process from 'node:process';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import * as routes from './route';
import { router } from './trpc';

const appRouter = router({
  ...routes,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

server.listen(process.env.TRPC_PORT || 8008, () => {
  console.log('listening on http://localhost:8008');
});
