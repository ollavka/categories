'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Main } from '@/components/Main';
import { Loader } from './Loader';

export const HomePage = () => {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  if (!pageLoaded) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
};
