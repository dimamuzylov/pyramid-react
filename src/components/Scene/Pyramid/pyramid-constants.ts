import { createLinearAnimation } from '@utils/threejs-animation';

/**
 * Pyramid linear animation breakpoints
 * [frame, value]
 */
export const pyramidLinearAnimationBreakpoints: [number, number][] = [
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
 * Pyramid linear animation position
 * initial - initial position
 * zoomIn - position for zoom in animation
 * zoomOut - position for zoom out animation
 */
export const pyramidLinearAnimationPosition = {
  initial: -5,
  zoomIn: 3.7,
  zoomOut: 0,
};

/**
 * Pyramid animation speed multiplier
 * y - speed multiplier for y axis
 * z - speed multiplier for z axis
 */
export const pyramidAnimationSpeedMultiplier = {
  initial: 1.5,
  zoom: 1.5,
};

/**
 * Pyramid linear animation initial
 */
export const initialLinearAnimation = createLinearAnimation(
  pyramidLinearAnimationPosition.initial,
  pyramidLinearAnimationPosition.zoomOut,
  pyramidLinearAnimationBreakpoints
);

/**
 * Pyramid linear animation zoomIn
 */
export const zoonInLinearAnimation = createLinearAnimation(
  pyramidLinearAnimationPosition.zoomOut,
  pyramidLinearAnimationPosition.zoomIn,
  pyramidLinearAnimationBreakpoints
);

/**
 * Pyramid linear animation zoomOut
 */
export const zoomOutLinearAnimation = createLinearAnimation(
  pyramidLinearAnimationPosition.zoomIn,
  pyramidLinearAnimationPosition.zoomOut,
  pyramidLinearAnimationBreakpoints
);
