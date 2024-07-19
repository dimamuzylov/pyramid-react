import { useContext, useEffect, useState } from 'react';
import InputNumber from '../../components/InputNumber';
import './Deposit.css';
import { ContractContext } from '../../context/ContractContext';
import Button from '../../components/Button';
import DaysPicker from '../../components/DaysPicker';
import QuickPicks from '../../components/QuickPicks';
import { dayPicks, quickPicks } from './deposit-constans';
import FAQButton from '../../components/FAQButton';
import Outcome from '../../components/Outcome';
import { calculateOutcome, getFormattedOutcome } from '@utils/outcome';
import { initInitData } from '@tma.js/sdk-react';

type TonRatesApiResponse = {
  rates: {
    TON: {
      prices: { USD: number };
    };
  };
};

function fetchTonPrice(): Promise<number> {
  return fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd')
    .then((response) => response.json())
    .then((data: TonRatesApiResponse) => data.rates.TON.prices.USD);
}

function Deposit() {
  const { config, sendDeposit } = useContext(ContractContext);
  const [tonPrice, setTonPrice] = useState<number>(0);
  const [outcome, setOutcome] = useState<number>(0);
  const [quickPick, setQuickPick] = useState<number | undefined>(quickPicks[2]);
  const [amount, setAmount] = useState<number>(quickPicks[2]);
  const [days, setDays] = useState<number>(dayPicks[2]);
  const referralAddress = initInitData()?.startParam;

  useEffect(() => {
    fetchTonPrice().then((tonPrice) => {
      setTonPrice(tonPrice);
    });
  }, []);

  useEffect(() => {
    if (config) {
      setOutcome(calculateOutcome(amount, days, config));
    }
  }, [amount, days, config]);

  return (
    <div className='flex flex-col pt-9 pb-2 px-5'>
      <div
        className={`background-overlay-deposit absolute top-0 bottom-0 left-0 right-0`}
      ></div>

      <div className='text-xl text-center text-black mb-1.5 font-semibold'>
        Your outcome
      </div>
      <Outcome outcome={getFormattedOutcome(outcome)} className='mb-7' />
      <div className='mb-4 font-semibold text-center'>Enter Your Amount</div>
      <div className='flex items-center gap-1.5 py-2.5 px-4 mb-4 rounded-2xl border border-solid border-primary-50 bg-white'>
        <div className='text-sm whitespace-nowrap'>
          Equal to ${Math.ceil(tonPrice * outcome)}
        </div>
        <div className='w-0.5 h-10 bg-black/50 ml-auto'></div>
        <InputNumber
          value={quickPick || 0}
          min={1}
          max={50}
          postfix='TON'
          onChange={(amount) => {
            setAmount(amount || 0);
            setQuickPick(undefined);
          }}
        />
      </div>
      <QuickPicks
        quickPicks={quickPicks}
        quickPick={quickPick}
        onQuickPickChange={(value) => {
          setAmount(value);
          setQuickPick(value);
        }}
      />
      <div className='text-center font-semibold mb-4'>Pick time period</div>
      <DaysPicker
        className='days-picker mb-8 text-white'
        days={dayPicks}
        onDaysChange={setDays}
      />
      <Button
        variant='solid'
        className='mb-2'
        onPress={() => {
          if (!config) return;
          if (days >= config.minDays && days <= config.maxDays) {
          }
          sendDeposit(1, 1, referralAddress);
        }}
      >
        Deposit
      </Button>
      <FAQButton />
    </div>
  );
}

export default Deposit;
