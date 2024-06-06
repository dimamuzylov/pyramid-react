import { Button } from '@nextui-org/button';
import { TonConnectButton } from '@tonconnect/ui-react';

function Home() {
  return (
    <>
      <TonConnectButton />
      <Button
        className='mb-10 mt-20 text-center text-white font-inter h-15'
        variant='light'
      >
        FAQ
      </Button>
    </>
  );
}

export default Home;
