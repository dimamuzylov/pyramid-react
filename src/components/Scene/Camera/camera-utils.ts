import { Vector3 } from 'three';
import {
  cameraAnimationPosition,
  zoomInLinearAnimation,
  cameraAnimationSpeedMultiplier,
  zoomOutLinearAnimation,
} from './camera-constants';
import { postEvent } from '@tma.js/sdk-react';

type DoAnimation = {
  position: Vector3;
  done: () => void;
};

type DoneAnimation = {
  position: Vector3;
  endPosition: {
    y: number;
    z: number;
  };
};

/**
 * Get is position end
 */
export function getIsPositionEnd({
  position,
  endPosition,
}: DoneAnimation): boolean {
  return position.y === endPosition.y && position.z === endPosition.z;
}

/**
 * Zoom in animation
 */
export function doZoomInAnimation({ position, done }: DoAnimation): void {
  if (position.y < cameraAnimationPosition.zoomIn.y) {
    position.y = zoomInLinearAnimation.y.calculate(
      position.y,
      zoomInLinearAnimation.y.result(position.y) *
        cameraAnimationSpeedMultiplier.y
    );
  }
  if (position.z > cameraAnimationPosition.zoomIn.z) {
    position.z = zoomInLinearAnimation.z.calculate(
      position.z,
      -zoomInLinearAnimation.y.result(position.y) *
        cameraAnimationSpeedMultiplier.z
    );
  }
  if (
    getIsPositionEnd({
      position,
      endPosition: cameraAnimationPosition.zoomIn,
    })
  ) {
    done();
  }
}

/**
 * Zoom out animation
 */
export function doZoomOutAnimation({ position, done }: DoAnimation): void {
  if (position.y > cameraAnimationPosition.zoomOut.y) {
    position.y = zoomOutLinearAnimation.y.calculate(
      position.y,
      -(
        zoomOutLinearAnimation.y.result(position.y) *
        cameraAnimationSpeedMultiplier.y
      )
    );
  }
  if (position.z < cameraAnimationPosition.zoomOut.z) {
    position.z = zoomOutLinearAnimation.z.calculate(
      position.z,
      zoomOutLinearAnimation.z.result(position.z) *
        cameraAnimationSpeedMultiplier.z
    );
  }
  if (
    getIsPositionEnd({
      position,
      endPosition: cameraAnimationPosition.zoomOut,
    })
  ) {
    done();
  }
}

/**
 * Telegram Haptic feedback
 * @param type - impact
 * @param impactStyle - light
 */
export function doHapticFeedback(): void {
  postEvent('web_app_trigger_haptic_feedback', {
    type: 'impact',
    impact_style: 'light',
  });
}
