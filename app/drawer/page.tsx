export const dynamic = 'force-dynamic';

import Drawer from '@/components/client/drawer/tldraw';
import { serverClient } from '@/app/_trpc/server';

export default async function DrawerPage() {
  const existentDrawing = await serverClient.getDrawing();

  return <Drawer existentDrawing={existentDrawing} />;
}
