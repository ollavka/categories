'use client';

import { useState, useEffect } from 'react';
import { Container } from './Container';
import { Button } from './Button';
import toast from 'react-hot-toast';
import { ButtonVariant, ICategory } from '@/types';
import { CategoryList } from './CategoryList';
import { CreateCategoryForm } from './CreateCategoryForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { ChangeButtons } from './ChangeButtons';
import * as categoriesApi from '@/helpers/categoriesApi';
import { Loader } from './Loader';

export const Main = () => {
  const [initCategories, setInitCategories] = useState<ICategory[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesChanged, setCategoriesChanged] = useState(false);
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const form = useForm({ mode: 'onBlur' });
  const { isValid, errors } = form.formState;

  const onReset = () => {
    setCategories(initCategories);
    setCreateNewCategory(false);
    setCategoriesChanged(false);

    form.clearErrors();
    form.reset();
  };

  const onCategoriesChange = (newCategories: ICategory[]) => {
    if (newCategories) {
      setCategories(newCategories);
    }

    setCategoriesChanged(true);
  };

  const onSubmit = async () => {
    if (!isValid && 'title' in errors) {
      const errorMessage = errors?.title?.message || 'Oops, Something went wrong';
      toast.error(errorMessage as string);
      return;
    }

    let data: ICategory[] = [...categories];

    const { title } = form.getValues();

    if (title) {
      setCreateNewCategory(false);

      const newCategory: ICategory = {
        id: uuidv4(),
        title,
        checked: false,
      };

      data = [newCategory, ...data];

      setCategories((prev) => [newCategory, ...prev]);

      try {
        await categoriesApi.createCategory(newCategory);
      } catch (err) {
        toast.error('Oops, something went wrong');
        return;
      }
    }

    try {
      await categoriesApi.updateCategories(data);
    } catch (err) {
      toast.error('Oops, something went wrong');
      return;
    }

    setCategoriesChanged(false);
    setInitCategories(data);
    form.reset();

    toast.success('Success');
  };

  const handleRemoveCategory = (id: string) => {
    setInitCategories(prev => prev.filter(category => category.id !== id));
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (!pageLoaded) {
      return;
    }

    const loadCategories = async() => {
      try {
        const categories = await categoriesApi.getCategories();

        setInitCategories(categories);
        setCategories(categories);
      } catch (err) {
        toast.error('Oops, something went wrong');
        return;
      }
    }

    loadCategories();
  }, [pageLoaded]);

  if (!pageLoaded || !categories.length) {
    return <Loader />
  }

  return (
    <main className="bg-main my-[120px]">
      <Container>
        <Button
          variant={ButtonVariant.Purple}
          iconPath="/icons/plus.svg"
          className="mb-[12px]"
          onClick={() => setCreateNewCategory(true)}
          disabled={createNewCategory}
        >
          Create a Category
        </Button>

        {createNewCategory && (
          <CreateCategoryForm
            className="mb-[12px]"
            form={form}
            onSubmit={onSubmit}
          />
        )}

        <CategoryList
          categories={categories}
          onCategoriesChange={onCategoriesChange}
          handleRemoveCategory={handleRemoveCategory}
        />

        {(createNewCategory || categoriesChanged) && (
          <ChangeButtons onSubmit={onSubmit} onReset={onReset} />
        )}
      </Container>
    </main>
  );
};
