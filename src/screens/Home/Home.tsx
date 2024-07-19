import { TonConnectButton } from '@tonconnect/ui-react';
import './Home.css';
import FAQButton from '../../components/FAQButton';

function Home() {
  return (
    <div className='flex flex-col h-full px-5'>
      <div
        className={`background-overlay-home absolute top-0 bottom-0 left-0 right-0`}
      ></div>
      <TonConnectButton />
      <FAQButton className='mb-10 mt-20 text-white' />
    </div>
  );
}

export default Home;
