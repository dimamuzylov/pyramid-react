import { create } from 'zustand';

/**
 * Animation sequence states:
 * 0: Not started
 * 1: Started
 */
type AnimationSequenceState = 0 | 1;

type AnimationSequence = [
  AnimationSequenceState,
  AnimationSequenceState,
  AnimationSequenceState
];

type AnimationTiming = 'initial' | 'zoomIn' | 'done';

type State = {
  /**
   * [pyramid inner, monument left, monument right]
   */
  animationSequence: AnimationSequence;
  animationTiming: AnimationTiming;
  updateAnimationTiming: (value: AnimationTiming) => void;
  updateAnimationSequence: (
    index: number,
    value: AnimationSequenceState
  ) => void;
  getAnimationSequence: (index: number) => AnimationSequenceState;
};

const useSceneStore = create<State>((set, getState) => ({
  animationSequence: [1, 1, 1],
  animationTiming: 'initial',
  updateAnimationTiming: (value: AnimationTiming) => {
    set({ animationTiming: value });
  },
  updateAnimationSequence: (index: number, value: AnimationSequenceState) => {
    set((state) => {
      const animationSequence: AnimationSequence = [...state.animationSequence];
      animationSequence[index] = value;
      return {
        animationSequence,
      };
    });
  },
  getAnimationSequence: (index: number) => getState().animationSequence[index],
}));

export { useSceneStore };
