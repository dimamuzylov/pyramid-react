import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import DepositDays from './DepositDays';
import { useContext } from 'react';
import { ContractContext } from '../context/ContractContext';

function Deposit() {
  const { sendDeposit } = useContext(ContractContext);

  return (
    <div className='flex flex-col h-full justify-around'>
      <div className='flex flex-col'>
        <span>Estimation Withdraw:</span>
        <span>0 TON</span>
      </div>
      <div className='flex flex-col'>
        <div className='flex gap-2'>
          <Input type='number' variant={'underlined'} placeholder='0' />
          <DepositDays />
        </div>
        <div className='p-2'>
          <Button
            color='secondary'
            variant='flat'
            radius='full'
            fullWidth
            onClick={() => sendDeposit(2, 7)}
          >
            Deposit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
