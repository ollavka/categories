import { ICategory } from '@/types';
import { normalizeStr } from './normalizeStr';

export const getFilteredCategories = (
  categories: ICategory[],
  title: string
) => {
  const normalizedTitle = normalizeStr(title);

  if (normalizedTitle) {
    return categories.filter(({ title }) =>
      normalizeStr(title).includes(normalizedTitle)
    );
  }

  return categories;
};
