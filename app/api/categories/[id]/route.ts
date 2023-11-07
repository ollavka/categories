import { NextResponse } from 'next/server';
import { categories, categoriesService } from '@/helpers/categoriesService';

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: Request, { params }: Params) {
  const { id } = params;

  categoriesService.remove(id);

  return NextResponse.json({ message: 'success' });
}
