import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { prisma } from '@/db';
import { TLRecord } from 'tldraw';

export const appRouter = router({
  getDrawing: publicProcedure.query(async () => {
    return prisma.drawing.findFirst();
  }),

  updateDrawing: publicProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.record(z.any()),
      })
    )
    .mutation(async ({ input: { content, id } }) => {
      return prisma.drawing.update({
        where: { id },
        data: {
          content,
        },
      });
    }),

  createDrawing: publicProcedure
    .input(
      z.object({
        content: z.record(z.any()),
      })
    )
    .mutation(async ({ input: { content } }) => {
      return prisma.drawing.create({
        data: {
          content,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
