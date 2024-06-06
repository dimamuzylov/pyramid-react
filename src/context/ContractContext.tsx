import { Address } from '@ton/core';
import { Maybe } from '@ton/core/dist/utils/maybe';
import { createContext } from 'react';
import { User } from '../types/user';

export type ContractContextState = {
  user: User | null;
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
