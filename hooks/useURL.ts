/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { SearchParams } from '@/types';
import { getSearchWith } from '@/helpers/seacrhHelper';

export const useURL = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currParams = useSearchParams();

  const searchParams = new URLSearchParams(currParams.toString());

  const pushParams = (params: SearchParams) => {
    const newSearchParams = getSearchWith(searchParams, params);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const clearParams = () => {
    router.push(pathname);
  }

  return {
    router,
    pathname,
    searchParams,
    pushParams,
    clearParams,
  }
};
