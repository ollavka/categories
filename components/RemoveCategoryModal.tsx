import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Button } from './Button';
import { FC } from 'react';
import { ButtonVariant } from '@/types';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  onRemoveCategory: () => void;
};

export const RemoveCategoryModal: FC<Props> = (props) => {
  const { isOpen, onClose, title = '', onRemoveCategory } = props;

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent className="px-[8px] py-[16px] bg-main">
        <ModalHeader className="text-center font-medium text-[24px]">
          {`Delete the ${title || 'Category'}?`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="text-center text-[20px] text-gray-accent">
          All templates in the category will be moved to the category
          &quot;Other&quot;
        </ModalBody>
        <ModalFooter className="flex flex-col gap-[14px]">
          <Button
            variant={ButtonVariant.Gradient}
            iconPath="/icons/delete-white.svg"
            onClick={onRemoveCategory}
          >
            Delete
          </Button>

          <Button
            variant={ButtonVariant.Cancel}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
