import { ICategory } from "@/types";
import { client } from "./fetchClient"

export const getCategories = () => {
  return client.get<ICategory[]>('/categories');
};

export const createCategory = (data: ICategory) => {
  return client.post<ICategory>('/categories', data);
};

export const removeCategory = (id: string) => {
  return client.delete<void>(`/categories/${id}`);
};

export const updateCategories = (data: ICategory[]) => {
  return client.put('/categories', data);
};
