import * as THREE from 'three';
import { Plane } from '@react-three/drei/core/shapes';
import { useAspect } from '@react-three/drei/core/useAspect';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';

function Cloud({
  image,
  position,
  aspect,
  isStatic,
}: {
  image: string;
  position: [number, number, number];
  aspect: [number, number, number];
  isStatic?: boolean;
}) {
  const texture = useLoader(THREE.TextureLoader, image);
  const scale = useAspect(aspect[0], aspect[1], aspect[2]);
  const ref = useRef<any>();

  if (!isStatic) {
    useFrame(({ clock }) => {
      const time = clock.getElapsedTime();
      ref.current.position.y = -Math.cos(time) * 0.1 + position[1];
    });
  }

  return (
    <Plane
      scale={scale}
      position={position}
      ref={ref}
      material-map={texture}
      material-toneMapped={false}
      material-transparent
      material-opacity={0.8}
    />
  );
}

export default Cloud;
