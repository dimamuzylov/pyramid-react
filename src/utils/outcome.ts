import { ContractConfig } from '../types/contract-config';

function findReferralProgramPercent(
  referralsCount: number,
  config: ContractConfig
) {
  const tail = config.referralsProgram.length - 1;
  for (let i = tail; i >= 0; i--) {
    if (referralsCount >= config.referralsProgram[i].referralsCount) {
      return config.referralsProgram[i].percent;
    }
  }
}

/**
 * Calculate the outcome based on the amount, days and daily percent
 */
export function calculateOutcome(
  amount: number,
  days: number,
  config: ContractConfig,
  referralsCount: number = 0
): number {
  const dailyPercent =
    findReferralProgramPercent(referralsCount, config) || config.dailyPercent;
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
