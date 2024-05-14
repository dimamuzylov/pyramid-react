import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import BottomNavigation from './components/BottomNavigation';
import { NextUIProvider } from '@nextui-org/react';
import { ContractContext } from './context/ContractContext';
import { useContext } from 'react';

function App() {
  const navigate = useNavigate();
  const { loading: contractLoading } = useContext(ContractContext);

  if (contractLoading) return <div>Loading...</div>;

  return (
    <NextUIProvider navigate={navigate} className='flex flex-col h-screen'>
      <div className='flex flex-col h-full'>
        <div className='flex items-center gap-5 py-5'>
          <div className='w-full h-0.25 bg-primary'></div>
          <span>LOGO</span>
          <div className='w-full h-0.25 bg-primary'></div>
        </div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/faq' element={<FAQ />} />
        </Routes>
      </div>
      <BottomNavigation />
    </NextUIProvider>
  );
}

export default App;
