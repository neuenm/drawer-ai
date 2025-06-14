import { publicProcedure, router } from './trpc';

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return 'Hi Vidext!';
  }),
});

export type AppRouter = typeof appRouter;
