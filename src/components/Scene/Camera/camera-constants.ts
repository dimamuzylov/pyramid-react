import { createLinearAnimation } from '@utils/threejs-animation';

/**
 * Camera linear animation breakpoints
 * [frame, value]
 */
export const cameraLinearAnimationBreakpoints: [number, number][] = [
  [10, 0.15],
  [20, 0.12],
  [30, 0.1],
  [40, 0.09],
  [50, 0.07],
  [60, 0.05],
  [70, 0.03],
  [80, 0.025],
  [100, 0.02],
];

/**
 * Camera animation position
 * zoomIn - position for zoom in animation
 * zoomOut - position for zoom out animation
 */
export const cameraAnimationPosition = {
  zoomIn: {
    y: 3.65,
    z: 3,
  },
  zoomOut: {
    y: 0,
    z: 5,
  },
};

/**
 * Camera animation speed multiplier
 * y - speed multiplier for y axis
 * z - speed multiplier for z axis
 */
export const cameraAnimationSpeedMultiplier = {
  y: 1.5,
  z: 0.75,
};

/**
 * Camera linear animation zoomIn
 * y - linear animation for y axis
 * z - linear animation for z axis
 *
 */
export const zoomInLinearAnimation = {
  y: createLinearAnimation(
    cameraAnimationPosition.zoomOut.y,
    cameraAnimationPosition.zoomIn.y,
    cameraLinearAnimationBreakpoints
  ),
  z: createLinearAnimation(
    cameraAnimationPosition.zoomOut.z,
    cameraAnimationPosition.zoomIn.z,
    cameraLinearAnimationBreakpoints
  ),
};

/**
 * Camera linear animation zoomOut
 * y - linear animation for y axis
 * z - linear animation for z axis
 */
export const zoomOutLinearAnimation = {
  y: createLinearAnimation(
    cameraAnimationPosition.zoomIn.y,
    cameraAnimationPosition.zoomOut.y,
    cameraLinearAnimationBreakpoints
  ),
  z: createLinearAnimation(
    cameraAnimationPosition.zoomIn.z,
    cameraAnimationPosition.zoomOut.z,
    cameraLinearAnimationBreakpoints
  ),
};
