'use client';

import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import AutoSaveListener from './autoSaveListener';
import { type Drawing } from '@prisma/client';
import { StoreSnapshot, TLRecord } from 'tldraw';

interface DrawerProps {
  existentDrawing: Drawing | null;
}

export default function Drawer({ existentDrawing }: DrawerProps) {
  const { content: existentDrawingContent = null, id: existentDrawingId = null } =
    existentDrawing || {};

  return (
    <Tldraw
      onMount={(editor) => {
        if (existentDrawingContent && typeof existentDrawingContent === 'object') {
          const snapshot = existentDrawingContent as unknown as StoreSnapshot<TLRecord>;
          editor.store.loadStoreSnapshot(snapshot);
        }
      }}
    >
      <AutoSaveListener existentDrawingId={existentDrawingId} />
    </Tldraw>
  );
}
