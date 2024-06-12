import { postEvent } from '@tma.js/sdk-react';
import { HTMLAttributes } from 'react';
import './QuickPicks.css';

type QuickPicksProps = HTMLAttributes<unknown> & {
  quickPicks: number[];
  quickPick?: number;
  onQuickPickChange?: (amount: number) => void;
};

function QuickPicks({
  quickPick,
  quickPicks,
  onQuickPickChange,
}: QuickPicksProps) {
  return (
    <div className='quick-picks flex items-center justify-between gap-2 mb-7 text-lg font-semibold'>
      {quickPicks.map((value) => (
        <div
          className={`flex items-center justify-center gap-1 w-18.5 h-12.5 rounded-2xl border border-solid border-primary-60 cursor-pointer ${
            quickPick === value && 'active'
          }`}
          onClick={() => {
            onQuickPickChange?.(value);
            postEvent('web_app_trigger_haptic_feedback', {
              type: 'impact',
              impact_style: 'soft',
            });
          }}
          key={value}
        >
          {value} <sub className='text-2xs'>TON</sub>
        </div>
      ))}
    </div>
  );
}

export default QuickPicks;
