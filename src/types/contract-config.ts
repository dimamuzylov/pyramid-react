export type ContractConfig = {
  dailyPercent: number;
  minDays: number;
  maxDays: number;
  referralsProgram: { referralsCount: number; percent: number }[];
};
