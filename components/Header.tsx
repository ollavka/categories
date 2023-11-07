import { Container } from './Container';
import { FC } from 'react';
import { Logo } from './Logo';
import { SearchInput } from './SearchInput';

type Props = {};

export const Header: FC<Props> = (props) => {
  return (
    <header className="fixed left-0 right-0 top-0 bg-main py-[18px] text-white border-bgc border-b z-10">
      <Container className="flex justify-between items-center">
        <Logo />
        <SearchInput />
      </Container>
    </header>
  );
};
