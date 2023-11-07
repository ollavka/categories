'use client';

import { FC } from 'react';
import { ICategory } from '@/types';
import Image from 'next/image';
import cn from 'classnames';
import { useDisclosure } from '@chakra-ui/react';
import { RemoveCategoryModal } from '../RemoveCategoryModal';
import toast from 'react-hot-toast';
import * as categoriesApi from '@/helpers/categoriesApi';
import './Category.css';

type Props = {
  category: ICategory;
  className?: string;
  dragHandleProps?: any;
  handleCategoryCheckChange: (categoryId: string, newChecked: boolean) => void;
  handleRemoveCategory?: (id: string) => void;
};

export const Category: FC<Props> = (props) => {
  const {
    category,
    className = '',
    dragHandleProps,
    handleCategoryCheckChange,
    handleRemoveCategory = () => {},
  } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onRemoveCategory = async () => {
    try {
      handleRemoveCategory(category.id);
      await categoriesApi.removeCategory(category.id);

      toast.success('Success');
    } catch (err) {
      toast.error('Oops, Something went wrong');
    }
  };

  return (
    <>
      <article
        className={cn(
          'flex select-none justify-between items-center py-[12px] px-[20px] rounded bg-category border-[2px] border-category-bd',
          className
        )}
      >
        <span
          className={cn(
            {
              'text-gray-600': !category.checked,
              'text-white': category.checked,
            },
            'duration-300 ease'
          )}
        >
          {category.title}
        </span>

        <div className="flex gap-[20px] items-center min-w-[120px]">
          <div className="flex">
            <input
              type="checkbox"
              className="checkbox hidden"
              id={`checkbox-${category.id}`}
              checked={category.checked}
              onChange={() =>
                handleCategoryCheckChange(category.id, !category.checked)
              }
            />

            <label htmlFor={`checkbox-${category.id}`} className="label">
              <div className="content">
                <span className="on">On</span>
                <span className="checker"></span>
                <span className="off">Off</span>
              </div>
            </label>
          </div>

          {!category?.isBase && (
            <>
              <button onClick={onOpen}>
                <Image
                  src="/icons/delete-gray.svg"
                  alt="delete"
                  width={12}
                  height={12}
                />
              </button>

              <span className="cursor-grab select-none" {...dragHandleProps}>
                <Image
                  src="/icons/drag.svg"
                  alt="delete"
                  width={10}
                  height={10}
                />
              </span>
            </>
          )}
        </div>
      </article>

      <RemoveCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        title={category.title}
        onRemoveCategory={onRemoveCategory}
      />
    </>
  );
};
