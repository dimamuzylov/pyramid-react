import { TonConnectButton } from '@tonconnect/ui-react';
import { useConnection } from '../hooks/useConnection';
import './Home.css';
import Deposit from '../components/Deposit';
import Withdraw from '../components/Withdraw';
import { useContext } from 'react';
import { ContractContext } from '../context/ContractContext';

function Home() {
  const { user, loading: contractLoading } = useContext(ContractContext);
  const { connected } = useConnection();

  if (contractLoading) return <div>Loading...</div>;
  if (!connected) return <TonConnectButton />;
  if (user) return <Withdraw />;

  return <Deposit />;
}

export default Home;
