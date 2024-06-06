import { useAspect } from '@react-three/drei/core/useAspect';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useSceneStore } from '@state/scene-store';
import { createLinearAnimation } from '@utils/threejs-animation';
import { Plane } from '@react-three/drei/core/shapes';

function Monument({
  image,
  isReversed,
}: {
  image: string;
  isReversed?: boolean;
}) {
  const texture = useLoader(THREE.TextureLoader, image);
  const scale = useAspect(1, 1.4, 0.04);
  const ref = useRef<any>();
  const updateAnimationSequence = useSceneStore(
    (state) => state.updateAnimationSequence
  );
  const animationInProgress = useSceneStore(
    (state) => state.animationInProgress
  );

  const positionX = isReversed ? 1 : -1;
  const finalPositionX = isReversed ? 0.5 : -0.5;
  const isFinalPosition = (currentPositionX: number) => {
    if (isReversed) return currentPositionX > finalPositionX;
    return currentPositionX < finalPositionX;
  };

  const linearAnimation = createLinearAnimation(positionX, finalPositionX, [
    [30, 0.008],
    [60, 0.005],
    [100, 0.003],
  ]);

  useFrame(() => {
    if (
      isFinalPosition(ref.current.position.x) &&
      animationInProgress.initial
    ) {
      const speed = linearAnimation.result(ref.current.position.x) * -positionX;
      ref.current.position.x = linearAnimation.calculate(
        ref.current.position.x,
        speed
      );

      if (ref.current.position.x === finalPositionX) {
        updateAnimationSequence('initial', isReversed ? 2 : 1, 0);
      }
    }
  });

  return (
    <Plane
      scale={scale}
      position={[positionX, -0.065, 0]}
      material-map={texture}
      material-toneMapped={false}
      ref={ref}
      material-transparent
    />
  );
}

export default Monument;
