import { useEffect, useState } from 'react';
import { ContractContext, ContractContextState } from './ContractContext';
import { useInit } from '../hooks/useInit';
import { Pyramid } from '../contracts/ContractWrapper';
import { useTonClient } from '../hooks/useTonClient';
import { useConnection } from '../hooks/useConnection';
import { useTonAddress } from '@tonconnect/ui-react';
import { Address, OpenedContract, fromNano, toNano } from '@ton/core';

interface Props {
  children: React.ReactNode;
}

/**
 * The main context provider
 */
export const ContractContextProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const client = useTonClient();
  const connection = useConnection();
  const userFriendlyAddress = useTonAddress();

  const [state, setState] = useState<
    Pick<ContractContextState, 'user' | 'loading'>
  >({ user: null, loading: true });

  const mainContract = useInit(async () => {
    if (!client) return;
    const contract = new Pyramid(
      Address.parse('EQAcWeGkhgaaaZiwUaIX8dArzvHa8_KzkhvpnhHQwaAh6hOw')
    );
    return client.open(contract) as OpenedContract<Pyramid>;
  }, [client]);

  useEffect(() => {
    if (!mainContract || !userFriendlyAddress) return;
    mainContract.getUser(Address.parse(userFriendlyAddress)).then((user) => {
      setState({
        user: user ? { coins: fromNano(user.coins), time: user.time } : null,
        loading: false,
      });
    });
  }, [mainContract, userFriendlyAddress]);

  /**
   * Declare the update state method that will handle the state values
   */
  const sendDeposit = (amount: number, days: number) => {
    mainContract?.sendUserDeposit(
      connection.sender,
      toNano(amount.toString()),
      days
    );
  };

  const sendWithdraw = () => {
    mainContract?.sendUserWithdraw(connection.sender, toNano('0.05'));
  };

  /**
   * Context wrapper that will provider the state values to all its children nodes
   */
  return (
    <ContractContext.Provider value={{ ...state, sendDeposit, sendWithdraw }}>
      {props.children}
    </ContractContext.Provider>
  );
};
