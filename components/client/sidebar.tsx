'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Pencil, Home } from 'lucide-react';
import Link from 'next/link';
import MobileHeader from './mobile-header';
import Logo from '@/components/server/logo';
import { usePathname } from 'next/navigation';

export default function MainSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <MobileHeader />
      <SidebarProvider>
        <Sidebar>
          <SidebarContent className='p-4'>
            <Logo />
            <Link href='/'>
              <SidebarMenuButton
                asChild
                className={`hover:bg-primary-hover ${
                  isActive('/') ? 'bg-primary font-semibold' : ''
                }`}
              >
                <span>
                  <div className='rounded-sm bg-gray-100 p-2'>
                    <Home className='h-3 w-3' strokeWidth={2.5} />
                  </div>
                  Home
                </span>
              </SidebarMenuButton>
            </Link>
            <Link href='/drawer'>
              <SidebarMenuButton
                asChild
                className={`hover:bg-primary-hover ${
                  isActive('/drawer') ? 'bg-primary font-semibold' : ''
                }`}
              >
                <span>
                  <div className='rounded-sm bg-gray-100 p-2'>
                    <Pencil className='h-3 w-3' strokeWidth={2.5} />
                  </div>
                  Draw
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarContent>
        </Sidebar>
        {children}
      </SidebarProvider>
    </>
  );
}
