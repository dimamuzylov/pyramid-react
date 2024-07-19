import { HTMLAttributes } from 'react';
import './Outcome.css';

type OutcomeProps = Pick<HTMLAttributes<unknown>, 'className'> & {
  outcome: number;
};

function Outcome({ outcome, className }: OutcomeProps) {
  return (
    <div
      className={`flex items-end gap-3 font-bold justify-center ${className}`}
    >
      <div className='outcome text-6xl'>{outcome}</div>
      <div className='outcome-symbol text-4xl'>TON</div>
    </div>
  );
}

export default Outcome;
