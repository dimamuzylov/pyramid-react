import { createContext } from 'react';
import { User } from '../types/user';
import { ContractConfig } from '../types/contract-config';

export type ContractContextState = {
  user: User | null;
  config: ContractConfig | null;
  loading: boolean;
  sendDeposit: (amount: number, days: number, refAddress?: string) => void;
  sendWithdraw: () => void;
};

const defaultState: ContractContextState = {
  user: null,
  config: null,
  loading: false,
  sendDeposit: () => {},
  sendWithdraw: () => {},
};

export const ContractContext = createContext(defaultState);
