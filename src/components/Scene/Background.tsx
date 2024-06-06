import * as THREE from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei/core/shapes';

import bgImg from '../../assets/bg.webp';

function Background({ children }: any) {
  const texture = useLoader(THREE.TextureLoader, bgImg);
  const viewport = useThree((state) => state.viewport);
  return (
    <Plane
      scale={[viewport.width + 0.5, viewport.height, 0]}
      position={[0.05, 0, 0]}
      material-map={texture}
      material-toneMapped={false}
    >
      {children}
    </Plane>
  );
}

export default Background;
