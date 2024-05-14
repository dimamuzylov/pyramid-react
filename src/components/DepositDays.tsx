import { Tab, Tabs } from '@nextui-org/react';

function DepositDays() {
  return (
    <Tabs aria-label='Options' color='primary' variant='light' isVertical>
      <Tab
        key='7'
        title={
          <div className='flex items-center text-xs'>
            <span>One Week</span>
          </div>
        }
      />
      <Tab
        key='14'
        title={
          <div className='flex items-center text-xs'>
            <span>Two Weeks</span>
          </div>
        }
      />
      <Tab
        key='21'
        title={
          <div className='flex items-center text-xs'>
            <span>Three Week</span>
          </div>
        }
      />
      <Tab
        key='30'
        title={
          <div className='flex items-center text-xs'>
            <span>Month</span>
          </div>
        }
      />
      <Tab
        key='custom'
        title={
          <div className='flex items-center text-xs'>
            <span>Custom</span>
          </div>
        }
      />
    </Tabs>
  );
  //   return (
  //     <RadioGroup label='Plans' orientation='horizontal'>
  //       <CustomRadio value='7'>One Week</CustomRadio>
  //       <CustomRadio value='14'>Two Weeks</CustomRadio>
  //       <CustomRadio value='21'>Three Weeks</CustomRadio>
  //       <CustomRadio value='30'>Month</CustomRadio>
  //       <CustomRadio value='custom'>Custom</CustomRadio>
  //     </RadioGroup>
  //   );
}

export default DepositDays;
