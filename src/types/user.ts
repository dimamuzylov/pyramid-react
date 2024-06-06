import { Address } from '@ton/core';

export type User = {
  coins: string;
  unlockDate: number;
  days: number;
  referralsCount: number;
  referralAddress: Address | null;
};
