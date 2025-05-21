import { createHTTPServer } from '@trpc/server/adapters/standalone'
import * as routes from './route'
import { router } from './trpc'

const appRouter = router({
  ...routes,
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
})

server.listen(8008, () => {
  console.log('listening on http://localhost:8008')
})
