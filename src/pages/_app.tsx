import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Foot from '../components/Foot';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ isSSR, setIsSSR ] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if(isSSR) return null;
  
  return (
    <div className="xl:w-full m-auto min-h-[100vh] bg-[#18191A]">
        <Navbar />
        <div className="flex flex-col">
          <Component {...pageProps} />
        </div>
        <Foot />
      </div>
  )
}

export default MyApp
