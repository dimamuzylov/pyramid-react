import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import floorImg from '../../assets/floor.webp';
import { Plane } from '@react-three/drei/core/shapes';

function Floor() {
  const texture = useLoader(THREE.TextureLoader, floorImg);
  const viewport = useThree((state) => state.viewport);
  return (
    <Plane
      scale={[viewport.width + 0.5, viewport.height, 0]}
      position={[0.05, 0, 0]}
      material-map={texture}
      material-toneMapped={false}
      material-transparent
    />
  );
}

export default Floor;
