'use client';

import { Tldraw, Editor } from 'tldraw';
import 'tldraw/tldraw.css';
import AutoSaveListener from './autoSaveListener';
import { type Drawing } from '@prisma/client';
import { StoreSnapshot, TLRecord } from 'tldraw';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/app/_trpc/client';
import { Bot } from 'lucide-react';
import { toast } from 'sonner';
import { createShapeId } from 'tldraw';

interface AIDrawingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prompt: string) => void;
}

interface DrawerProps {
  existentDrawing: Drawing | null;
}

function AIDrawingDialog({ open, onOpenChange, onSubmit }: AIDrawingDialogProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (!prompt) {
      toast.error('Por favor, ingresa una descripción del dibujo');
      return;
    }
    onSubmit(prompt);
    setPrompt('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setPrompt('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => onOpenChange(true)}
          className='absolute top-12 left-2 z-50 rounded-full p-4 shadow-lg'
        >
          <Bot className='w-8 h-8' />
          Dibujar con IA
        </Button>
      </DialogTrigger>
      <DialogOverlay className='z-[998] fixed inset-0 bg-black/50' />
      <DialogContent className='fixed z-[999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md sm:max-w-xl md:max-w-2xl '>
        <DialogHeader>
          <DialogTitle>Generar Dibujo con IA</DialogTitle>
          <DialogDescription>
            Describe lo que quieres dibujar y la IA lo creará automáticamente en el panel de dibujo.
            <br />
            <span className='font-bold'>
              Por el momento, solo se pueden crear formas geométricas simples.
            </span>
            <br />
            Por ejemplo:
            <br />• Un cuadrado amarillo grande
            <br />• Un círculo verde mediano <br />• Un poligono violeta <br />• Un circulo
            aplastado <br />• Un rectangulo tres veces mas ancho que su alto
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <label htmlFor='ai-prompt' className='text-sm font-medium'>
              Descripción del dibujo
            </label>
            <textarea
              id='ai-prompt'
              placeholder='Ej: Un rectángulo amarillo'
              className='w-full mt-1 p-3 border rounded-md resize-none h-24'
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className='flex gap-2'>
          <Button variant='outline' onClick={handleClose}>
            Cerrar
          </Button>
          <Button onClick={handleSubmit}>Generar Dibujo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Drawer({ existentDrawing }: DrawerProps) {
  const { content: existentDrawingContent = null, id: existentDrawingId = null } =
    existentDrawing || {};

  const [open, setOpen] = useState(false);
  const generateShapeFromPrompt = trpc.generateShapeFromPrompt.useMutation();
  const editorRef = useRef<Editor | null>(null);

  const handleSubmitPrompt = (prompt: string) => {
    setOpen(false);
    generateShapeFromPrompt.mutate(
      { prompt },
      {
        onSuccess: (shape) => {
          if (editorRef.current) {
            try {
              const uniqueShape = {
                ...shape,
                id: createShapeId(),
              };
              editorRef.current.createShape(uniqueShape);
            } catch (err: any) {
              toast.error('Error creando shape:', err);
            }
          }
        },
        onError: (error: any) => {
          toast.error(`Error generando shape con IA: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className='relative w-full h-full'>
      <Tldraw
        onMount={(editor) => {
          editorRef.current = editor;
          if (existentDrawingContent && typeof existentDrawingContent === 'object') {
            const snapshot = existentDrawingContent as unknown as StoreSnapshot<TLRecord>;
            editor.store.loadStoreSnapshot(snapshot);
          }
        }}
      >
        <AutoSaveListener existentDrawingId={existentDrawingId} />
      </Tldraw>

      <AIDrawingDialog open={open} onOpenChange={setOpen} onSubmit={handleSubmitPrompt} />
    </div>
  );
}
