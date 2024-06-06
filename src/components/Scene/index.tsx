import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { useSceneStore } from '../../state/scene-store';
import './index.css';
import { Button } from '@nextui-org/button';

import Background from './Background';
import Cloud from './Cloud';
import Pyramid from './Pyramid';
import Floor from './Floor';
import Monument from './Monument';
import Sphinx from './Sphinx';
import Camera from './Camera';

import cloudImg1 from '../../assets/cloud_1.webp';
import cloudImg2 from '../../assets/cloud_2.webp';
import cloudImg3 from '../../assets/cloud_3.webp';
import monumentLeftImg from '../../assets/monument_left.webp';
import monumentRightImg from '../../assets/monument_right.webp';

function SceneWrapper() {
  const viewport = useThree((state) => state.viewport);
  const animationSequence = useSceneStore((state) => state.animationSequence);
  const animationTiming = useSceneStore((state) => state.animationTiming);
  const updateAnimationTiming = useSceneStore(
    (state) => state.updateAnimationTiming
  );

  useEffect(() => {
    if (animationSequence.every((value) => value === 0)) {
      setTimeout(() => {
        updateAnimationTiming('zoomIn');
      }, 500);
    }
  }, [animationSequence]);

  return (
    <>
      <Cloud
        image={cloudImg1}
        position={[viewport.width / 3, 2, 0]}
        aspect={[1, 0.48, 0.15]}
      />
      <Cloud
        image={cloudImg2}
        position={[viewport.width / 2.5, 3, 0]}
        aspect={[1, 0.39, 0.15]}
        isStatic
      />
      <Cloud
        image={cloudImg3}
        position={[-viewport.width / 2, 3, 0]}
        aspect={[1, 0.48, 0.15]}
      />
      <Pyramid
        finalPositionY={animationTiming === 'initial' ? 0 : 3.7}
        animationSpeed={1.5}
      />
      <Floor />
      <Background>
        <Monument image={monumentLeftImg} />
        <Monument image={monumentRightImg} isReversed />
      </Background>
      <Sphinx />
      <Camera zoomIn={animationTiming === 'zoomIn'} />
    </>
  );
}

function Scene({ children }: any) {
  const animationTiming = useSceneStore((state) => state.animationTiming);

  return (
    <div className='h-full rounded-t-3xl overflow-hidden relative'>
      <div
        className='content-wrapper flex flex-col h-full relative z-50 px-5'
        style={{ opacity: animationTiming === 'done' ? 1 : 0 }}
      >
        {children}
        <Button
          className='mb-10 mt-20 text-center text-white font-inter h-15'
          variant='light'
        >
          FAQ
        </Button>
      </div>
      <div className='background-container absolute top-0 bottom-0 left-0 right-0'>
        <div
          className={`background-overlay ${
            animationTiming === 'done' && 'blue'
          } absolute top-0 bottom-0 left-0 right-0 z-10`}
        ></div>
        <Canvas>
          <Suspense fallback={null}>
            <SceneWrapper />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Scene;
