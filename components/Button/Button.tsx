'use client';

import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { ButtonVariant } from '@/types';
import Image from 'next/image';
import cn from 'classnames';
import './Button.css';

type Props = {
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  variant: ButtonVariant;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  iconPath?: string;
};

export const Button: FC<Props> = (props) => {
  const {
    type = 'button',
    variant,
    children,
    className = '',
    iconPath = '',
    onClick = () => {},
    disabled = false,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'button flex items-center justify-center py-[12px] xl:py-[20px] w-full rounded text-white font-semibold duration-300 ease hover:opacity-60',
        variant,
        className,
        {
          'opacity-60 select-none': disabled,
          'gap-[10px]': !!iconPath,
        }
      )}
    >
      {iconPath ? (
        <>
          <Image
            src={iconPath}
            alt="icon"
            width={18}
            height={18}
          />

          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
