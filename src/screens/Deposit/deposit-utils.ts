/**
 * Calculate the outcome based on the amount, days and daily percent
 */
export function calculateOutcome(
  amount: number,
  days: number,
  dailyPercent: number
): number {
  const prizeAmountInPercentage = days * dailyPercent;
  const prizeAmount = (amount * prizeAmountInPercentage) / 100;
  return amount + prizeAmount;
}

/**
 * Get the formatted outcome with 2 decimal places
 */
export function getFormattedOutcome(outcome: number): number {
  return Math.round(outcome * 100) / 100; // round to 2 decimal places
}
