import { useEffect, useRef } from 'react';
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

  const previousSavedIdRef = useRef(existentDrawingId);

  useEffect(() => {
    const saveChanges = debounce(() => {
      const { document } = getSnapshot(editor.store);
      if (previousSavedIdRef.current) {
        updateDrawing.mutate(
          { id: previousSavedIdRef.current, content: document },
          {
            onSettled: (data, error) => {
              if (error) {
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
                toast.error(`Error creando, ${error}`);
              } else {
                if (!previousSavedIdRef.current) previousSavedIdRef.current = data?.id ?? null;
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
