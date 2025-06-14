'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Pencil, GalleryVerticalEnd, Home } from 'lucide-react';
import Link from 'next/link';

export default function MainSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className='p-4'>
          <Link href='/'>
            <SidebarMenuButton asChild>
              <span>
                <Home />
                Home
              </span>
            </SidebarMenuButton>
          </Link>
          <Link href='/drawer'>
            <SidebarMenuButton asChild>
              <span>
                <Pencil />
                Draw
              </span>
            </SidebarMenuButton>
          </Link>

          <Link href='/gallery'>
            <SidebarMenuButton asChild>
              <span>
                <GalleryVerticalEnd />
                Gallery
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarContent>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}
