import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { prisma } from '@/db';
import { generateShapeFromPromptRequest } from '@/services/openAI/generateShapeFromPrompt';
import { SHAPES_TYPES } from '@/constants';

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

  generateShapeFromPrompt: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      try {
        if (!input.prompt.toLowerCase().match(SHAPES_TYPES.join('|'))) {
          throw new Error(
            'Solo se pueden generar formas geométricas simples como rectángulo, triángulo, círculo, etc.'
          );
        }

        return await generateShapeFromPromptRequest(input.prompt);
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Unknown error during shape generation'
        );
      }
    }),
});

export type AppRouter = typeof appRouter;
