import { useContext, useEffect, useState } from 'react';
import Outcome from '../../components/Outcome';
import { ContractContext } from '../../context/ContractContext';
import { TimeLeft, calculateTimeLeft } from './withdraw-utils';
import { calculateOutcome, getFormattedOutcome } from '@utils/outcome';
import Button from '../../components/Button';
import FAQButton from '../../components/FAQButton';
import './Withdraw.css';
import { useDisclosure } from '@nextui-org/modal';
import ReferralModal from '../../components/ReferralModal';

function Withdraw() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user, config, sendWithdraw } = useContext(ContractContext);
  const [outcome, setOutcome] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const endTime = user ? user.unlockDate * 1000 : 0;
      const timeLeft = calculateTimeLeft(endTime);
      setTimeLeft(timeLeft);
      if (!timeLeft) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (user && config) {
      setOutcome(calculateOutcome(Number(user.coins), user.days, config));
    }
  }, [user, config]);

  return (
    <div className='flex flex-col pt-9 flex-1'>
      <div className='flex flex-col px-5'>
        <div className='text-xl text-center text-black mb-1.5 font-semibold'>
          Your outcome
        </div>
        <Outcome outcome={getFormattedOutcome(outcome)} className='mb-5' />
        {timeLeft ? (
          <div className='flex flex-col rounded-2xl mb-11 bg-gray-100 text-white items-center py-1.5'>
            <span>Withdraw {getFormattedOutcome(outcome)} TON in</span>
            <div className='font-medium'>
              {timeLeft.days} days : {timeLeft.hours} hours : {timeLeft.minutes}{' '}
              min : {timeLeft.seconds} sec
            </div>
          </div>
        ) : (
          <Button variant='solid' className='mb-11' onPress={sendWithdraw}>
            Withdraw
          </Button>
        )}
      </div>

      <div className='invite-friend-info flex flex-col mt-auto rounded-t-3xl pt-10 px-5 text-center text-white'>
        <div className='text-3xl font-medium mb-2.5'>Wanna get +7%?</div>
        <div className='font-medium mb-7'>
          Invite new users, and after they deposit in Pyramid, you'll get your
          bonus
        </div>
        <Button variant='solid' className='mb-2' onPress={onOpen}>
          Invite a friend
        </Button>
        <ReferralModal isOpen={isOpen} onOpenChange={onOpenChange} />
        <FAQButton />
      </div>
    </div>
  );
}

export default Withdraw;
