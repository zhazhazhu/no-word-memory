import type { H3Event } from 'h3';
import { getServerSession } from '#auth';

async function createNuxtTrpcContext(event: H3Event) {
  const session = await getServerSession(event);

  return {
    session,
  };
}

export type CreateNuxtTrpcContext = typeof createNuxtTrpcContext;

export { createNuxtTrpcContext };
