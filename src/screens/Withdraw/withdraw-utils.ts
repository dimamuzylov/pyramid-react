export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function calculateTimeLeft(endTime: number) {
  const currentTime = new Date().getTime();
  let timeLeft = endTime - currentTime;

  if (timeLeft < 0) {
    return null;
  }

  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
