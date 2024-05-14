import { createContext } from 'react';

export type ContractContextState = {
  user: {
    coins: string;
    time: number;
  } | null;
  loading: boolean;
  sendDeposit: (amount: number, days: number) => void;
  sendWithdraw: () => void;
};

const defaultState: ContractContextState = {
  user: null,
  loading: true,
  sendDeposit: () => {},
  sendWithdraw: () => {},
};

export const ContractContext = createContext(defaultState);
