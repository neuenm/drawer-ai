'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Home, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Logo from '@/components/server/logo';

export default function MobileHeader({ isActive }: { isActive: (path: string) => boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <header className='md:hidden border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
        <div className='px-4 py-3'>
          <div className='flex items-center justify-between'>
            <Logo />
            <CollapsibleTrigger asChild className={`bg-primary  `}>
              <Button variant='ghost' size='icon' className='hover:bg-gray-100'>
                <Menu className='h-6 w-6' />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className='mt-3 space-y-2 animate-slide-down'>
            <Link
              href='/'
              className={`flex items-center px-2 py-2 hover:bg-gray-100 rounded-md hover:bg-primary-hover ${
                isActive('/') ? 'bg-primary font-semibold' : ''
              }`}
            >
              <div className='rounded-sm bg-gray-100 p-2 me-1'>
                <Home className='h-3 w-3' strokeWidth={2.5} />
              </div>
              <span>Home</span>
            </Link>

            <Link
              href='/drawer'
              className={`flex items-center px-2 py-2 hover:bg-gray-100 rounded-md hover:bg-primary-hover ${
                isActive('/drawer') ? 'bg-primary font-semibold' : ''
              }`}
            >
              <div className='rounded-sm bg-gray-100 p-2 me-1'>
                <Pencil className='h-3 w-3' strokeWidth={2.5} />
              </div>
              <span>Draw</span>
            </Link>
          </CollapsibleContent>
        </div>
      </header>
    </Collapsible>
  );
}
