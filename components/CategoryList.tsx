'use client';

import { FC, useMemo, useState } from 'react';
import { Category } from './Category';
import { ICategory } from '@/types';
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { useURL } from '@/hooks/useURL';
import { getFilteredCategories } from '@/helpers/getFilteredCategories';
import cn from 'classnames';

type Props = {
  categories: ICategory[];
  onCategoriesChange: (categories: ICategory[]) => void;
  handleRemoveCategory: (id: string) => void;
};

export const CategoryList: FC<Props> = (props) => {
  const [startDrag, setStartDrag] = useState(false);
  const { categories, onCategoriesChange, handleRemoveCategory } = props;
  const { searchParams } = useURL();

  const titleParam = searchParams.get('title') || '';

  const preparedCategories = useMemo(
    () => getFilteredCategories(categories, titleParam),
    [titleParam, categories]
  );

  const onDragEnd: OnDragEndResponder = (result) => {
    setStartDrag(false);

    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const reorderedCategories = [...categories];
    const [reorderedCategory] = reorderedCategories.splice(source.index, 1);
    reorderedCategories.splice(destination.index, 0, reorderedCategory);

    onCategoriesChange(reorderedCategories);
  };

  const handleCategoryCheckChange = (
    categoryId: string,
    newChecked: boolean
  ) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, checked: newChecked };
      }

      return category;
    });

    onCategoriesChange(updatedCategories);
  };

  if (!preparedCategories.length) {
    return <p className="text-white text-center mt-48 text-3xl">Categories not found</p>
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setStartDrag(true)}>
        <Droppable droppableId="categories">
          {(provided) => (
            <ul
              className="flex flex-col"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {preparedCategories.map(
                (category, index) =>
                  !category?.isBase && (
                    <Draggable
                      key={category.id}
                      draggableId={category.id.toString()}
                      index={+index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Category
                            category={category}
                            className="mb-[12px]"
                            dragHandleProps={provided.dragHandleProps}
                            handleCategoryCheckChange={
                              handleCategoryCheckChange
                            }
                            handleRemoveCategory={handleRemoveCategory}
                          />
                        </li>
                      )}
                    </Draggable>
                  )
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <ul className="flex flex-col">
        {preparedCategories
          .filter((category) => category.isBase)
          .map((category) => (
            <Category
              key={category.id}
              category={category}
              className={cn({
                'mt-[12px] translate-y-full': startDrag,
              })}
              handleCategoryCheckChange={handleCategoryCheckChange}
            />
          ))}
      </ul>
    </>
  );
};
