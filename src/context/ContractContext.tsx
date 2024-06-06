import { Address } from '@ton/core';
import { Maybe } from '@ton/core/dist/utils/maybe';
import { createContext } from 'react';

export type ContractContextState = {
  user: {
    coins: string;
    unlockDate: number;
  } | null;
  loading: boolean;
  sendDeposit: (
    amount: number,
    days: number,
    refAddress?: Maybe<Address>
  ) => void;
  sendWithdraw: () => void;
};

const defaultState: ContractContextState = {
  user: null,
  loading: false,
  sendDeposit: () => {},
  sendWithdraw: () => {},
};

export const ContractContext = createContext(defaultState);
