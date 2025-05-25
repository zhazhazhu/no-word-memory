import type { CreateNuxtTrpcContext } from './contexts';
import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import * as routes from './route';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<CreateNuxtTrpcContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

/**
 * Export reusable middleware
 * that can be used throughout the router
 */
export const publicProcedure = t.procedure;

/**
 * Export reusable middleware
 * that can be used throughout the router
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const appRouter = router({
  ...routes,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
