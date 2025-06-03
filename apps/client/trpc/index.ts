import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import * as routes from './route';
import { router } from './trpc';

export const appRouter = router(routes);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;

export type RouterOutput = inferRouterOutputs<AppRouter>;
