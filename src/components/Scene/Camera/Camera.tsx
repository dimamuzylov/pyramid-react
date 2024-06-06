import { useFrame, useThree } from '@react-three/fiber';
import { useSceneStore } from '@state/scene-store';
import {
  doHapticFeedback,
  doZoomInAnimation,
  doZoomOutAnimation,
  getIsPositionEnd,
} from './camera-utils';
import { useEffect } from 'react';
import { cameraAnimationPosition } from './camera-constants';

function Camera() {
  const camera = useThree((state) => state.camera);
  const animationInProgress = useSceneStore(
    (state) => state.animationInProgress
  );
  const updateAnimationSequence = useSceneStore(
    (state) => state.updateAnimationSequence
  );

  useFrame(() => {
    if (
      !getIsPositionEnd({
        position: camera.position,
        endPosition: cameraAnimationPosition.zoomIn,
      }) &&
      animationInProgress.zoomIn
    ) {
      doZoomInAnimation({
        position: camera.position,
        done: () => updateAnimationSequence('zoomIn', 0, 0),
      });
    }
    if (
      !getIsPositionEnd({
        position: camera.position,
        endPosition: cameraAnimationPosition.zoomOut,
      }) &&
      animationInProgress.zoomOut
    ) {
      doZoomOutAnimation({
        position: camera.position,
        done: () => updateAnimationSequence('zoomOut', 0, 0),
      });
    }
  });

  /**
   * Haptic feedback for zoom in and zoom out animations
   */
  useEffect(() => {
    let interval: any;
    if (animationInProgress.zoomIn || animationInProgress.zoomOut) {
      doHapticFeedback();

      interval = setInterval(() => {
        doHapticFeedback();
      }, 350);
    }

    return () => clearInterval(interval);
  }, [animationInProgress]);

  return <></>;
}

export default Camera;
