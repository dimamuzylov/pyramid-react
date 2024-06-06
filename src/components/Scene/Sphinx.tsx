import * as THREE from 'three';
import { Plane } from '@react-three/drei/core/shapes';
import { useAspect } from '@react-three/drei/core/useAspect';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';

import sphinxImg from '../../assets/sphinx.webp';

function Sphinx() {
  const texture = useLoader(THREE.TextureLoader, sphinxImg);
  const scale = useAspect(1, 1, 0.4);
  const ref = useRef<any>();
  const ref1 = useRef<any>();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (ref.current.material.opacity < 1) {
      ref.current.material.opacity = (1 + Math.sin(time)) / 1.8;
    }

    const y = Math.cos(time) * 0.05;
    ref.current.position.set(0, y, 0);
    ref1.current.position.set(0, -y + -4.5, 0);
  });
  return (
    <>
      <Plane
        scale={scale}
        material-map={texture}
        material-toneMapped={false}
        position={[0, 0, 0]}
        ref={ref}
        material-transparent
        material-opacity={0}
      />
      <Plane
        scale={scale}
        material-map={texture}
        material-toneMapped={false}
        position={[0, -4.5, 0]}
        rotation={[0, 0, (180 * Math.PI) / 180]}
        ref={ref1}
        material-transparent
        material-opacity={0.5}
      />
    </>
  );
}

export default Sphinx;
