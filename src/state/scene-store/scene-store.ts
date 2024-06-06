import { create } from 'zustand';

/**
 * Animation sequence states:
 * 0: Not started
 * 1: Started
 */
type AnimationSequenceState = 0 | 1;
type AnimationSequence = Record<AnimationTiming, AnimationSequenceState[]>;
type AnimationProgress = Record<AnimationTiming, boolean>;
type AnimationTiming = 'initial' | 'zoomIn' | 'zoomOut';

type State = {
  animationSequence: AnimationSequence;
  animationInProgress: AnimationProgress;
  updateAnimationSequence: (
    timing: AnimationTiming,
    index: number,
    value: AnimationSequenceState
  ) => void;
};

const useSceneStore = create<State>((set) => ({
  animationSequence: {
    initial: [1, 1, 1], // [pyramid inner, monument left, monument right]
    zoomIn: [0, 0], // [pyramid inner, camera]
    zoomOut: [0, 0], // [pyramid inner, camera]
  },
  animationInProgress: {
    initial: true,
    zoomIn: false,
    zoomOut: false,
  },
  updateAnimationSequence: (
    timing: AnimationTiming,
    index: number,
    value: AnimationSequenceState
  ) => {
    set((state) => {
      const animationSequenceState = [...state.animationSequence[timing]];
      animationSequenceState[index] = value;
      return {
        animationSequence: {
          ...state.animationSequence,
          [timing]: animationSequenceState,
        },
        animationInProgress: {
          ...state.animationInProgress,
          [timing]: animationSequenceState.some((state) => state === 1),
        },
      };
    });
  },
}));

export { useSceneStore };
