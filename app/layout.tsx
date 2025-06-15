import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TRPCProvider from './_trpc/Provider';
import MainSidebar from '@/components/client/sidebar';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DrawApp',
  description: 'Vidext drawer app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TRPCProvider>
          <MainSidebar>
            <div className='h-screen w-screen'>
              {children}
              <Toaster />
            </div>
          </MainSidebar>
        </TRPCProvider>
      </body>
    </html>
  );
}
