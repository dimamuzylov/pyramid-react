import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useContext, useEffect, useState } from 'react';
import { useSceneStore } from '@state/scene-store';
import './index.css';

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
import { ContractContext } from '../../context/ContractContext';
import { useConnection } from '../../hooks/useConnection';

type AnimationScene = 'initial' | 'zoomIn';

function SceneWrapper({
  walletConnected,
  animationScene,
  setAnimationScene,
}: {
  walletConnected: boolean;
  animationScene: AnimationScene;
  setAnimationScene: (scene: AnimationScene) => void;
}) {
  const viewport = useThree((state) => state.viewport);
  const animationInProgress = useSceneStore(
    (state) => state.animationInProgress
  );
  const updateAnimationSequence = useSceneStore(
    (state) => state.updateAnimationSequence
  );

  const animationSequence = useSceneStore((state) => state.animationSequence);

  useEffect(() => {
    let timeout: number | undefined;

    if (!animationInProgress.initial) {
      timeout = setTimeout(() => {
        if (animationScene === 'initial' && walletConnected) {
          updateAnimationSequence('zoomIn', 0, 1);
          updateAnimationSequence('zoomIn', 1, 1);
          setAnimationScene('zoomIn');
        }
        if (animationScene === 'zoomIn' && !walletConnected) {
          updateAnimationSequence('zoomOut', 0, 1);
          updateAnimationSequence('zoomOut', 1, 1);
          setAnimationScene('initial');
        }
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [walletConnected, animationSequence, animationScene]);

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
      <Pyramid />
      <Floor />
      <Background>
        <Monument image={monumentLeftImg} />
        <Monument image={monumentRightImg} isReversed />
      </Background>
      <Sphinx />
      <Camera />
    </>
  );
}

function Scene({ children }: { children: any }) {
  const { loading: contractLoading } = useContext(ContractContext);
  const { connected: walletConnected } = useConnection();
  const animationInProgress = useSceneStore(
    (state) => state.animationInProgress
  );
  const animationSequence = useSceneStore((state) => state.animationSequence);
  const [animationScene, setAnimationScene] = useState<'initial' | 'zoomIn'>(
    'initial'
  );
  const [opacity, setOpacityState] = useState(0);

  useEffect(() => {
    const initialAnimated = !animationInProgress.initial;
    const zoomInAnimated = !animationInProgress.zoomIn;
    const animated = walletConnected
      ? initialAnimated && zoomInAnimated && animationScene === 'zoomIn'
      : initialAnimated;

    if (animated && !contractLoading) {
      setOpacityState(1);
    }
  }, [animationSequence, animationScene, contractLoading]);

  return (
    <div className='flex flex-col relative flex-1'>
      <div
        className='content-wrapper flex flex-col relative z-50 px-5 flex-1'
        style={{
          opacity,
        }}
      >
        {children}
      </div>
      <div className='background-container absolute rounded-t-3xl overflow-hidden  top-0 bottom-0 left-0 right-0'>
        <Canvas>
          <Suspense fallback={null}>
            <SceneWrapper
              walletConnected={walletConnected}
              animationScene={animationScene}
              setAnimationScene={setAnimationScene}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Scene;
