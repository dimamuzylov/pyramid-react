import { TonConnectButton } from '@tonconnect/ui-react';
import Button from '../../components/Button';
import './Home.css';

function Home() {
  return (
    <>
      <div
        className={`background-overlay-home absolute top-0 bottom-0 left-0 right-0`}
      ></div>
      <TonConnectButton />
      <Button className='mb-10 mt-20 text-white' variant='light'>
        FAQ
      </Button>
    </>
  );
}

export default Home;
