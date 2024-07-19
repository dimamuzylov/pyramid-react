import './App.css';
import { useEffect } from 'react';
import { postEvent, useMiniApp } from '@tma.js/sdk-react';
import Scene from './components/Scene';
import Container from './screens/Container';
import { useConnection } from './hooks/useConnection';
import Icon from './components/Icon';

function App() {
  const { connected, disconnect } = useConnection();
  const tgMiniApp = useMiniApp();

  useEffect(() => {
    tgMiniApp.ready();
    postEvent('web_app_expand');
  }, [tgMiniApp]);

  return (
    <div className='flex flex-col px-4 h-full'>
      <div className='flex items-center justify-between pt-4 pb-2.5 h-13.5 box-content relative shrink-0'>
        <span className='uppercase font-lexend-peta'>PYRAMID</span>
        <img
          src='./logo_pyramid.webp'
          alt=''
          width='54px'
          height='54px'
          className='absolute right-0 left-0 mx-auto'
        />
        {connected && (
          <button onClick={disconnect} className='w-5 h-5 text-black'>
            <Icon icon='Exit' />
          </button>
        )}
      </div>
      <Scene>
        <Container />
      </Scene>
    </div>
  );
}

export default App;
