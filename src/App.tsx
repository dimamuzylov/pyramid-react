import './App.css';
import { ContractContext } from './context/ContractContext';
import { useContext } from 'react';
import Background from './components/Background';
import { TonConnectButton } from '@tonconnect/ui-react';

function App() {
  const { loading: contractLoading } = useContext(ContractContext);

  return (
    <div className='flex flex-col px-4 h-full'>
      <div className='flex items-center pt-4 pb-2.5 h-13.5 box-content relative'>
        <span className='uppercase font-lexend-peta'>PYRAMID</span>
        <img
          src='./public/logo_pyramid.webp'
          alt=''
          width='54px'
          height='54px'
          className='absolute right-0 left-0 mx-auto'
        />
      </div>
      <Background>
        {contractLoading ? <div>Loading...</div> : <TonConnectButton />}
      </Background>
    </div>
  );
}

export default App;
