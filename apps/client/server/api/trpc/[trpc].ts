import { createTRPCNuxtHandler } from 'trpc-nuxt/server';
import { appRouter } from '~/trpc';
import { createNuxtTrpcContext } from '~/trpc/contexts';

// export API handler
export default createTRPCNuxtHandler({
  router: appRouter,
  createContext: createNuxtTrpcContext,
});
