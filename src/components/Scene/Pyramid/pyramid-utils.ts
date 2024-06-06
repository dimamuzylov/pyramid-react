import { Vector3 } from 'three';
import {
  initialLinearAnimation,
  pyramidAnimationSpeedMultiplier,
  pyramidLinearAnimationPosition,
  zoomOutLinearAnimation,
  zoonInLinearAnimation,
} from './pyramid-constants';
import { postEvent } from '@tma.js/sdk-react';

type DoAnimation = {
  position: Vector3;
  done: () => void;
};

/**
 * Initial animation
 */
export function doInitialAnimation({ position, done }: DoAnimation): void {
  position.y = initialLinearAnimation.calculate(
    position.y,
    initialLinearAnimation.result(position.y) *
      pyramidAnimationSpeedMultiplier.initial
  );
  if (position.y === pyramidLinearAnimationPosition.zoomOut) {
    done();
  }
}

/**
 * Zoom in animation
 */
export function doZoomInAnimation({ position, done }: DoAnimation): void {
  position.y = zoonInLinearAnimation.calculate(
    position.y,
    zoonInLinearAnimation.result(position.y) *
      pyramidAnimationSpeedMultiplier.zoom
  );

  if (position.y === pyramidLinearAnimationPosition.zoomIn) {
    done();
  }
}

/**
 * Zoom out animation
 */
export function doZoomOutAnimation({ position, done }: DoAnimation): void {
  position.y = zoomOutLinearAnimation.calculate(
    position.y,
    -(
      zoomOutLinearAnimation.result(position.y) *
      pyramidAnimationSpeedMultiplier.zoom
    )
  );

  if (position.y === pyramidLinearAnimationPosition.zoomOut) {
    done();
  }
}

/**
 * Telegram Haptic feedback
 * @param type - notification
 * @param notification_type - error
 */
export function doHapticFeedback(): void {
  postEvent('web_app_trigger_haptic_feedback', {
    type: 'notification',
    notification_type: 'error',
  });
}
