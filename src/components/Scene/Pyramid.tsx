import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useSceneStore } from '../../state/scene-store';
import { useAspect } from '@react-three/drei/core/useAspect';
import { useEffect, useRef } from 'react';
import { createLinearAnimation } from '../../utils/threejs-animation';
import { Plane } from '@react-three/drei/core/shapes';

import pyramidInnerImg from '../../assets/pyramid_inner.webp';
import { postEvent } from '@tma.js/sdk-react';

function Pyramid(
  { finalPositionY, animationSpeed } = { finalPositionY: 0, animationSpeed: 1 }
) {
  const texture = useLoader(THREE.TextureLoader, pyramidInnerImg);
  const scale = useAspect(1, 0.8, 1);
  const ref = useRef<any>();
  const animationTiming = useSceneStore((state) => state.animationTiming);
  const animationSequence = useSceneStore((state) => state.animationSequence);
  const updateAnimationSequence = useSceneStore(
    (state) => state.updateAnimationSequence
  );
  const getAnimationSequence = useSceneStore(
    (state) => state.getAnimationSequence
  );

  const linearAnimation = createLinearAnimation(-5, 0, [
    [10, 0.15],
    [20, 0.12],
    [30, 0.1],
    [40, 0.09],
    [50, 0.07],
    [60, 0.05],
    [70, 0.03],
    [80, 0.025],
    [100, 0.02],
  ]);

  useFrame(() => {
    if (ref.current.position.y < finalPositionY) {
      const speed = linearAnimation.result(ref.current.position.y);
      ref.current.position.y = ref.current.position.y + speed * animationSpeed;
    } else if (getAnimationSequence(0) === 1) {
      updateAnimationSequence(0, 0);
    }
  });

  // useEffect(() => {
  //   let interval: any;
  //   if (animationTiming === 'initial' && animationSequence[0] === 0) {
  //     interval = setInterval(() => {
  //       postEvent('web_app_trigger_haptic_feedback', {
  //         type: 'notification',
  //         notification_type: 'error',
  //       });
  //     }, 150);
  //   }

  //   return () => clearInterval(interval);
  // }, [animationSequence, animationTiming]);

  return (
    <Plane
      scale={scale}
      position={[0, -5, 0]}
      ref={ref}
      material-map={texture}
      material-toneMapped={false}
      material-transparent
    />
  );
}

export default Pyramid;
