import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useSceneStore } from '@state/scene-store';
import { useAspect } from '@react-three/drei/core/useAspect';
import { useEffect, useRef } from 'react';
import { Plane } from '@react-three/drei/core/shapes';

import pyramidInnerImg from '../../../assets/pyramid_inner.webp';
import {
  doHapticFeedback,
  doInitialAnimation,
  doZoomInAnimation,
  doZoomOutAnimation,
} from './pyramid-utils';
import { pyramidLinearAnimationPosition } from './pyramid-constants';

function Pyramid() {
  const texture = useLoader(THREE.TextureLoader, pyramidInnerImg);
  const scale = useAspect(1, 0.8, 1);
  const ref = useRef<any>();
  const animationSequence = useSceneStore((state) => state.animationSequence);
  const updateAnimationSequence = useSceneStore(
    (state) => state.updateAnimationSequence
  );
  const animationInProgress = useSceneStore(
    (state) => state.animationInProgress
  );

  useFrame(() => {
    if (
      ref.current.position.y < pyramidLinearAnimationPosition.zoomOut &&
      animationInProgress.initial
    ) {
      doInitialAnimation({
        position: ref.current.position,
        done: () => updateAnimationSequence('initial', 0, 0),
      });
    }
    if (
      ref.current.position.y < pyramidLinearAnimationPosition.zoomIn &&
      animationInProgress.zoomIn
    ) {
      doZoomInAnimation({
        position: ref.current.position,
        done: () => updateAnimationSequence('zoomIn', 1, 0),
      });
    }
    if (
      ref.current.position.y > pyramidLinearAnimationPosition.zoomOut &&
      animationInProgress.zoomOut
    ) {
      doZoomOutAnimation({
        position: ref.current.position,
        done: () => updateAnimationSequence('zoomOut', 1, 0),
      });
    }
  });

  /**
   * Haptic feedback for initial animation
   */
  useEffect(() => {
    let interval: any;
    if (animationInProgress.initial && animationSequence['initial'][0] === 1) {
      interval = setInterval(() => {
        doHapticFeedback();
      }, 150);
    }

    return () => clearInterval(interval);
  }, [animationSequence, animationInProgress]);

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
