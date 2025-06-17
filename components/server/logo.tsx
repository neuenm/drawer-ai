import React from 'react';
import { Palette } from 'lucide-react';

const Logo = () => (
  <div className='flex items-center space-x-3'>
    <div className='w-10 h-10 bg-gradient-to-br from-gray-900 to-primary rounded-lg flex items-center justify-center'>
      <Palette className='h-6 w-6 text-white' />
    </div>
    <div>
      <h1 className='text-xl font-bold text-gray-900'>DrawApp</h1>
      <p className='text-sm text-gray-500'>Powered by tldraw</p>
    </div>
  </div>
);

export default Logo;
