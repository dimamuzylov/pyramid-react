import { useFrame, useThree } from '@react-three/fiber';
import { createLinearAnimation } from '../../utils/threejs-animation';
import { useSceneStore } from '../../state/scene-store';
import { useEffect } from 'react';
import { postEvent } from '@tma.js/sdk-react';

function Camera({ zoomIn } = { zoomIn: false }) {
  const camera = useThree((state) => state.camera);
  const animationTiming = useSceneStore((state) => state.animationTiming);
  const updateAnimationTiming = useSceneStore(
    (state) => state.updateAnimationTiming
  );

  const speedY = createLinearAnimation(camera.position.y, 3.85, [
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
  const speedZ = createLinearAnimation(camera.position.z, 3, [
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
    if (zoomIn) {
      if (camera.position.y < 3.65) {
        camera.position.y =
          camera.position.y + speedY.result(camera.position.y) * 0.78;
      }
      if (camera.position.z > 3) {
        camera.position.z =
          camera.position.z - speedZ.result(camera.position.z);
      }

      if (
        camera.position.y >= 3.65 &&
        camera.position.z <= 3 &&
        animationTiming !== 'done'
      ) {
        updateAnimationTiming('done');
      }
    }
  });

  const doHapticFeedback = () => {
    postEvent('web_app_trigger_haptic_feedback', {
      type: 'impact',
      impact_style: 'light',
    });
  };

  // useEffect(() => {
  //   let interval: any;
  //   if (animationTiming === 'zoomIn') {
  //     doHapticFeedback();

  //     interval = setInterval(() => {
  //       doHapticFeedback();
  //     }, 350);
  //   }

  //   return () => clearInterval(interval);
  // }, [animationTiming]);

  return <></>;
}

export default Camera;
