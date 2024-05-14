import {
  Address,
  beginCell,
  Cell,
  Contract,
  ContractProvider,
  Sender,
  SendMode,
} from '@ton/core';

export class Pyramid implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  async sendUserDeposit(
    provider: ContractProvider,
    sender: Sender,
    value: bigint,
    days: number
  ) {
    await provider.internal(sender, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(1003, 32).storeUint(days, 32).endCell(),
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

  async getUser(provider: ContractProvider, address: Address) {
    const result = await provider.get('get_user', [
      {
        type: 'slice',
        cell: beginCell().storeAddress(address).endCell(),
      },
    ]);

    const tuple = result.stack.readTupleOpt();

    return tuple
      ? {
          time: tuple.readNumber(),
          coins: tuple.readBigNumber(),
        }
      : null;
  }
}
