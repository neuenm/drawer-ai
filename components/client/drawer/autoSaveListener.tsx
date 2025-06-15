import { useEffect } from 'react';
import { useEditor, getSnapshot } from 'tldraw';
import { debounce } from 'lodash';
import { trpc } from '@/app/_trpc/client';
import { toast } from 'sonner';

export default function AutoSaveListener({
  existentDrawingId,
}: {
  existentDrawingId: string | null;
}) {
  const editor = useEditor();
  const createDrawing = trpc.createDrawing.useMutation();
  const updateDrawing = trpc.updateDrawing.useMutation();
  useEffect(() => {
    const saveChanges = debounce(() => {
      const { document } = getSnapshot(editor.store);
      if (existentDrawingId) {
        updateDrawing.mutate(
          { id: existentDrawingId, content: document },
          {
            onSettled: (data, error) => {
              if (error) {
                console.error('Error actualizando:', error);
                toast.error(`Error actualizando, ${error}`);
              } else {
                toast.success('Actualizado correctamente');
              }
            },
          }
        );
      } else {
        createDrawing.mutate(
          { content: document },
          {
            onSettled: (data, error) => {
              if (error) {
                console.error('Error creando:', error);
                toast.error(`Error creando, ${error}`);
              } else {
                toast.success('Primer guardado finalizado');
              }
            },
          }
        );
      }
    }, 1500);

    const stopListening = editor.store.listen(
      () => {
        saveChanges();
      },
      { source: 'user', scope: 'document' }
    );

    return () => {
      stopListening();
      saveChanges.cancel();
    };
  }, [editor]);

  return null;
}
