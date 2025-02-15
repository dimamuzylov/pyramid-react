import { useContext } from 'react';
import { ContractContext } from '../context/ContractContext';
import { useConnection } from '../hooks/useConnection';
import Home from './Home';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

function Container() {
  const { loading, user } = useContext(ContractContext);
  const connection = useConnection();

  if (loading) return <></>;
  if (!connection.connected) return <Home />;
  if (connection.connected && !user) return <Deposit />;
  return <Withdraw />;
}

export default Container;
