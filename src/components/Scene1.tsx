import * as THREE from 'three';
import { useRef } from 'react';
import { invalidate, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Plane, useAspect } from '@react-three/drei';

import bgImg from '../assets/bg.webp';
import sphinxImg from '../assets/sphinx.webp';
import pyramidInnerImg from '../assets/pyramid_inner.webp';
import monumentLeftImg from '../assets/monument_left.webp';
import monumentRightImg from '../assets/monument_right.webp';
import floorImg from '../assets/floor.webp';
import cloudImg1 from '../assets/cloud_1.webp';
import cloudImg2 from '../assets/cloud_2.webp';
import cloudImg3 from '../assets/cloud_3.webp';

function MainBackground({ children }: any) {
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

function PyramidInner() {
  const texture = useLoader(THREE.TextureLoader, pyramidInnerImg);
  const scale = useAspect(1, 0.8, 0.62);
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref.current.position.y < 1) {
      const time = clock.getElapsedTime();
      ref.current.position.y =
        ref.current.position.y + Math.abs(Math.cos(time) * 0.08);
    }
  });
  return (
    <Plane
      scale={scale}
      position={[0, -6.5, 0]}
      ref={ref}
      material-map={texture}
      material-toneMapped={false}
      material-transparent
    />
  );
}

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
    invalidate();
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

  const positionX = isReversed ? 1 : -1;
  const isFinalPosition = (currentPositionX: number) => {
    if (isReversed) return currentPositionX > 0.5;
    return currentPositionX < -0.5;
  };

  useFrame(({ clock }) => {
    if (isFinalPosition(ref.current.position.x)) {
      const time = clock.getElapsedTime();
      ref.current.position.x =
        ref.current.position.x + Math.abs(Math.cos(time) * 0.004) * -positionX;
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

function Scene1() {
  const viewport = useThree((state) => state.viewport);

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
      <PyramidInner />
      <Floor />
      <MainBackground>
        <Monument image={monumentLeftImg} />
        <Monument image={monumentRightImg} isReversed />
      </MainBackground>
      <Sphinx />
    </>
  );
}

export default Scene1;
