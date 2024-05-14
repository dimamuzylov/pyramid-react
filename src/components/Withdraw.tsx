import { useContext } from 'react';
import { ContractContext } from '../context/ContractContext';
import { Button } from '@nextui-org/button';

function Withdraw() {
  const { user, sendWithdraw } = useContext(ContractContext);

  return (
    <div className='flex flex-col'>
      <div>{user?.coins} TON</div>
      <div className='p-2'>
        <Button
          color='secondary'
          variant='flat'
          radius='full'
          fullWidth
          onClick={() => sendWithdraw()}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
}

export default Withdraw;
