import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene1 from '../Scene1';
import './Background.css';
import { Button } from '@nextui-org/button';

function Background({ children }: any) {
  return (
    <div className='h-full rounded-t-3xl overflow-hidden relative'>
      <div className='flex flex-col h-full relative z-50 px-5'>
        {children}
        <Button
          className='mb-10 mt-20 text-center text-white font-inter h-15'
          variant='light'
        >
          FAQ
        </Button>
      </div>
      <div className='background-container absolute top-0 bottom-0 left-0 right-0'>
        <div className='background-overlay absolute top-0 bottom-0 left-0 right-0 z-10'></div>
        <Canvas>
          <Suspense fallback={null}>
            <Scene1 />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Background;
