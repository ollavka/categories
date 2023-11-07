/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Breakpoint } from '@/types';

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(Breakpoint.Mobile);

  const getBreakpoint = (width: number) => {
    if (width >= Breakpoint.Desktop) {
      return Breakpoint.Desktop;
    }

    if (width >= Breakpoint.Tablet) {
      return Breakpoint.Tablet;
    }

    return Breakpoint.Mobile;
  };

  useEffect(() => {
    setBreakpoint(getBreakpoint(window.innerWidth));
  }, []);

  useEffect(() => {
    if (!window) {
      return;
    }

    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);

      if (newBreakpoint !== breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return breakpoint;
};
