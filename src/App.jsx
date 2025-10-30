import { ethers } from 'ethers';
import './App.css'



import Layout from './components/Layout';
import Layout1 from './components/Layout1';
import { useState, useEffect } from 'react';

function App() {
  const [componentVisible, setComponentVisible] = useState(() => {
    const savedState = localStorage.getItem('componentVisible');
    const isNewSession = !sessionStorage.getItem('sessionActive'); 
    if (isNewSession) {
      localStorage.removeItem('componentVisible'); 
      sessionStorage.setItem('sessionActive', 'true'); 
      return false; 
    }
    return savedState === 'true'; 
  });

  useEffect(() => {
    localStorage.setItem('componentVisible', componentVisible.toString());
  }, [componentVisible]);

  return (
    <>


    {componentVisible ?<Layout/> : <Layout1 componentVisible={componentVisible} setComponentVisible={setComponentVisible} />}
   
     

   
    </>
  )
}

export default App
