import { FC, ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container: FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={cn('container max-w-[1300px] px-4 mx-auto', className)}>
      {children}
    </div>
  );
};
