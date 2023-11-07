import { FC } from 'react';
import { Button } from './Button';
import { ButtonVariant } from '@/types';
import { Container } from './Container';

type Props = {
  onSubmit: () => void;
  onReset: () => void;
};

export const ChangeButtons: FC<Props> = (props) => {
  const {
    onSubmit = () => {},
    onReset = () => {},
  } = props;

  return (
    <section className="fixed bottom-0 left-0 right-0 bg-buttons">
      <Container className="flex py-[20px] gap-[26px]">
        <Button
          variant={ButtonVariant.Green}
          iconPath="/icons/check-circle.svg"
          onClick={onSubmit}
        >
          Save Changes
        </Button>

        <Button
          variant={ButtonVariant.Outlined}
          onClick={onReset}
        >
          Cancel
        </Button>
      </Container>
    </section>
  );
};
