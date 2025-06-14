import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter, // appRouter is the router we defined in the server/index.ts file
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
