'use client';

import { FC } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import cn from 'classnames';

type Props = {
  className?: string;
  onSubmit: () => void;
  form: UseFormReturn<FieldValues, any, undefined>;
};

export const CreateCategoryForm: FC<Props> = ({
  className = '',
  onSubmit,
  form,
}) => {
  const { register, handleSubmit } = form;

  return (
    <form
      className={cn(
        'flex select-none justify-between items-center py-[12px] px-[20px] rounded bg-category border-[2px] border-category-bd',
        className
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('title', {
          required: 'Category name is required',
        })}
        type="text"
        className="bg-transparent text-white placeholder:text-gray-600 w-full"
        placeholder="Enter Category Name"
        autoFocus
      />
    </form>
  );
};
