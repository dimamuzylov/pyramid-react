import { TonConnectButton } from '@tonconnect/ui-react';
import './Home.css';
import FAQ from '../../components/FAQ';

function Home() {
  return (
    <>
      <div
        className={`background-overlay-home absolute top-0 bottom-0 left-0 right-0`}
      ></div>
      <TonConnectButton />
      <FAQ className='mb-10 mt-20 text-white' />
    </>
  );
}

export default Home;
