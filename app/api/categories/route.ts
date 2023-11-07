import { NextResponse } from 'next/server';
import { categoriesService } from '@/helpers/categoriesService';

export async function GET() {
  const category = categoriesService.getAll();

  return NextResponse.json(category);
}

export async function POST(req: Request) {
  const { id, title, checked } = await req.json();

  if (!id || !title) {
    return;
  }

  const categories = categoriesService.create({ id, title, checked });

  return NextResponse.json({ id, title, checked });
}

export async function PUT(req: Request) {
  const newCategories = await req.json();

  categoriesService.update(newCategories);

  return NextResponse.json({ message: 'success' });
}
