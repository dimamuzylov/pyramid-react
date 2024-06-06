/**
 *
 * @param breakpoints [position in percent, number]
 */
export function createLinearAnimation(
  from: number,
  to: number,
  breakpoints: [number, number][]
): { result: (current: number) => number } {
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
  };
}
