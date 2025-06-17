'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 py-20'>
        <div className='max-w-4xl mx-auto'>
          <Card className='border-2 border-dashed border-red-200 bg-red-50/50'>
            <CardHeader className='text-center'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>⚠️</span>
              </div>
              <CardTitle className='text-2xl text-red-600'>¡Ups! Algo salió mal</CardTitle>
            </CardHeader>
            <CardContent className='text-center space-y-6'>
              <p className='text-gray-600 text-lg'>
                Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta nuevamente.
              </p>
              <Button onClick={reset} size='lg' className='bg-primary hover:bg-primary/90'>
                <ArrowRight className='h-4 w-4 mr-2' />
                Intentar nuevamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
