import { Tab, Tabs } from '@nextui-org/tabs';
import { Link, useLocation } from 'react-router-dom';

function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <div className='flex w-full flex-col'>
      <Tabs
        selectedKey={pathname}
        aria-label='Options'
        color='primary'
        variant='bordered'
        radius='none'
        fullWidth
      >
        <Tab
          key='/'
          href='/'
          title={
            <div className='flex items-center space-x-2'>
              <span>Deposit</span>
            </div>
          }
          as={Link}
        />
        <Tab
          key='/faq'
          href='/faq'
          title={
            <div className='flex items-center space-x-2'>
              <span>FAQ</span>
            </div>
          }
          as={Link}
        />
      </Tabs>
    </div>
  );
}

export default BottomNavigation;
