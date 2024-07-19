import { useEffect, useState } from 'react';
import { ContractContext, ContractContextState } from './ContractContext';
import { useInit } from '../hooks/useInit';
import { Pyramid } from '../contracts/ContractWrapper';
import { useTonClient } from '../hooks/useTonClient';
import { useConnection } from '../hooks/useConnection';
import { useTonAddress } from '@tonconnect/ui-react';
import { Address, OpenedContract, toNano } from '@ton/core';
import { ContractConfig } from '../types/contract-config';
import { User } from '../types/user';

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
    Pick<ContractContextState, 'user' | 'config' | 'loading'>
  >({ user: null, config: null, loading: true });

  const mainContract = useInit(async () => {
    if (!client) return;
    const contract = new Pyramid(
      Address.parse('EQBNDBuXa7ChuVjpa0XaZ7NPM9p-k_pwHBP6eLRIbQTyRsse')
    );
    return client.open(contract) as OpenedContract<Pyramid>;
  }, [client]);

  useEffect(() => {
    if (!mainContract) {
      setState({ ...state, loading: false });
      return;
    }
    setState({ ...state, loading: true });

    const requests: Partial<[Promise<ContractConfig>, Promise<User | null>]> = [
      mainContract.getConfig(),
    ];

    if (userFriendlyAddress) {
      requests.push(mainContract.getUser(Address.parse(userFriendlyAddress)));
    }

    Promise.all(requests).then(([config, user]) => {
      setState({
        user: user || null,
        config: config || null,
        loading: false,
      });
    });
  }, [mainContract, userFriendlyAddress]);

  /**
   * Declare the update state method that will handle the state values
   */
  const sendDeposit = (amount: number, days: number, refAddress?: string) => {
    if (!mainContract) return;
    mainContract.sendUserDeposit(
      connection.sender,
      toNano(amount.toString()),
      days,
      refAddress ? Address.parse(refAddress) : undefined
    );
  };

  const sendWithdraw = () => {
    if (!mainContract) return;
    mainContract.sendUserWithdraw(connection.sender, toNano('0.05'));
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
