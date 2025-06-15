import { useEffect } from 'react';
import { useEditor, getSnapshot } from 'tldraw';
import { debounce } from 'lodash';
import { trpc } from '@/app/_trpc/client';

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
        updateDrawing.mutate({ id: existentDrawingId, content: document });
      } else {
        createDrawing.mutate({ content: document });
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
