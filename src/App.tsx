import './App.css';
import { useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { postEvent, useMiniApp } from '@tma.js/sdk-react';
import Scene from './components/Scene';

function App() {
  // const tgMiniApp = useMiniApp();

  // useEffect(() => {
  //   tgMiniApp.ready();
  //   postEvent('web_app_expand');
  // }, [tgMiniApp]);

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
      <Scene>
        <TonConnectButton />
      </Scene>
    </div>
  );
}

export default App;
