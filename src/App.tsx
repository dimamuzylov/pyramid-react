import './App.css';
import { useEffect } from 'react';
import { postEvent, useMiniApp } from '@tma.js/sdk-react';
import Scene from './components/Scene';
import Container from './screens/Container';
import { useConnection } from './hooks/useConnection';
import { useTonWallet } from '@tonconnect/ui-react';

function App() {
  const { disconnect } = useConnection();
  const wallet = useTonWallet();
  const tgMiniApp = useMiniApp();

  useEffect(() => {
    tgMiniApp.ready();
    postEvent('web_app_expand');
  }, [tgMiniApp]);

  return (
    <div className='flex flex-col px-4 h-full'>
      <div className='flex items-center justify-between pt-4 pb-2.5 h-13.5 box-content relative'>
        <span className='uppercase font-lexend-peta'>PYRAMID</span>
        <img
          src='./public/logo_pyramid.webp'
          alt=''
          width='54px'
          height='54px'
          className='absolute right-0 left-0 mx-auto'
        />
        {wallet && <button onClick={disconnect}>dis</button>}
      </div>
      <Scene>
        <Container />
      </Scene>
    </div>
  );
}

export default App;
