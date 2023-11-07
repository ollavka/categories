/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { useURL } from '@/hooks/useURL';
import debounce from 'lodash.debounce';
import Image from 'next/image';

export const SearchInput = () => {
  const { searchParams, pushParams } = useURL();

  const titleParam = searchParams.get('title') || '';
  const [title, setTitle] = useState(titleParam);

  const applyTitle = useCallback(
    debounce(pushParams, 1000),
    [searchParams.toString()]
  );

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const normalizedValue = value.trim();

    setTitle(value);

    if (normalizedValue) {
      applyTitle({ title: normalizedValue });

      return;
    }

    applyTitle.cancel();
    pushParams({ title: null });
  }

  return (
    <div className="flex bg-secondary py-[10px] rounded">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Seacrh"
        className="text-white bg-secondary text-[14px] pl-[10px] sm:pl-[20px] placeholder:text-gray-accent max-w-[150px] sm:max-w-none md:min-w-[280px] xl:min-w-[380px]"
      />

      <Image
        className="mr-[10px] sm:mx-[20px]"
        src="/icons/search.svg"
        alt="search"
        width={20}
        height={20}
      />
    </div>
  );
};
