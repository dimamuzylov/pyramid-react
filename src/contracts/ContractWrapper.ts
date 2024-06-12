import {
  Address,
  beginCell,
  Cell,
  Contract,
  ContractProvider,
  fromNano,
  Sender,
  SendMode,
} from '@ton/core';
import { Maybe } from '@ton/core/dist/utils/maybe';
import { User } from '../types/user';
import { ContractConfig } from '../types/contract-config';

export class Pyramid implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  async sendUserDeposit(
    provider: ContractProvider,
    sender: Sender,
    value: bigint,
    days: number,
    refAddress?: Maybe<Address>
  ) {
    await provider.internal(sender, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(1003, 32)
        .storeUint(days, 32)
        .storeAddress(refAddress || null)
        .endCell(),
    });
  }

  async sendUserWithdraw(
    provider: ContractProvider,
    sender: Sender,
    value: bigint
  ) {
    await provider.internal(sender, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(1004, 32).endCell(),
    });
  }

  async getUser(
    provider: ContractProvider,
    address: Address
  ): Promise<User | null> {
    const result = await provider.get('get_user', [
      {
        type: 'slice',
        cell: beginCell().storeAddress(address).endCell(),
      },
    ]);
    const tuple = result.stack.readTupleOpt();

    return tuple
      ? {
          unlockDate: tuple.readNumber(),
          coins: fromNano(tuple.readBigNumber()),
          days: tuple.readNumber(),
          referralsCount: tuple.readNumber(),
          referralAddress: tuple.readAddressOpt(),
        }
      : null;
  }

  async getConfig(provider: ContractProvider): Promise<ContractConfig> {
    const result = await provider.get('get_config', []);
    const tuple = result.stack.readTuple();

    const dailyPercent = Number(fromNano(tuple.readNumber()));
    const minDays = tuple.readNumber();
    const maxDays = tuple.readNumber();
    let referralsProgramTuple = tuple.readTupleOpt();

    const referralsProgram = [];

    while (referralsProgramTuple?.remaining) {
      referralsProgram.push({
        referralsCount: referralsProgramTuple.readNumber(),
        percent: Number(fromNano(referralsProgramTuple.readBigNumber())),
      });
    }

    return {
      dailyPercent,
      minDays,
      maxDays,
      referralsProgram,
    };
  }
}
