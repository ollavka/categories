import { ICategory } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export let categories: ICategory[] = [
  {
    id: uuidv4(),
    title: 'Category 1',
    checked: true,
  },
  {
    id: uuidv4(),
    title: 'Category 2',
    checked: false,
  },
  {
    id: uuidv4(),
    title: 'Category 3',
    checked: true,
  },
  {
    id: uuidv4(),
    title: 'Other',
    checked: false,
    isBase: true,
  },
];

export const categoriesService = {
  getAll: () => categories,
  create: (data: ICategory) => {
    categories.unshift(data);
  },
  remove: (id: string) => {
    categories = categories.filter(category => category.id !== id);
  },
  update: (data: ICategory[]) => {
    categories = [...data];
  },
};
