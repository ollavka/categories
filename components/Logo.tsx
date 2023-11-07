'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Breakpoint } from '@/types';

export const Logo = () => {
  const breakpoint = useBreakpoint();

  const imgWidth = {
    [Breakpoint.Mobile]: 39,
    [Breakpoint.Tablet]: 52,
    [Breakpoint.Desktop]: 78,
  }

  const imgHeight = {
    [Breakpoint.Mobile]: 15,
    [Breakpoint.Tablet]: 20,
    [Breakpoint.Desktop]: 30,
  }

  return (
    <Link href="/" className="inline-flex flex-col gap-[5px] sm:gap-[10px] sm:flex-row sm:items-center">
      <Image
        src="/icons/logo.svg"
        alt='look'
        width={imgWidth[breakpoint]}
        height={imgHeight[breakpoint]}
      />

      <span className="text-[14px] sm:text-[20px] lg:text-[30px] font-bold text-white">Memes</span>
    </Link>
  );
};
