export type LinearAnimation = {
  result: (current: number) => number;
  calculate: (current: number, speed: number) => number;
};

/**
 *
 * @param breakpoints [position in percent, number]
 */
export function createLinearAnimation(
  from: number,
  to: number,
  breakpoints: [number, number][]
): LinearAnimation {
  const total = to - from; // total distance

  const lastBreakpoint = breakpoints[breakpoints.length - 1][1];
  let currentBreakpointIndex = 0;

  return {
    result: (current) => {
      const currD = to - current; // current distance
      const left = total - currD; // distance left
      const percent = (left * 100) / total; // percent of distance left

      if (percent > breakpoints[currentBreakpointIndex]?.[0]) {
        currentBreakpointIndex++;
      }

      return breakpoints[currentBreakpointIndex]?.[1] || lastBreakpoint;
    },
    calculate: (current, speed) => {
      const result = current + speed;
      const currD = to - current; // current distance
      const left = total - currD + speed; // distance left

      return Math.abs(left) >= Math.abs(total) ? to : result;
    },
  };
}
