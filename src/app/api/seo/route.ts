import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/seo?page=/about
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  if (!page) return NextResponse.json({ error: 'Missing page param' }, { status: 400 });
  const seo = await prisma.sEO.findFirst({ where: { page } });
  return NextResponse.json(seo, { status: 200 });
}

// POST /api/seo
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { page, title, description, keywords, image } = data;
  if (!page) return NextResponse.json({ error: 'Missing page' }, { status: 400 });
  // You must provide a unique identifier for 'where'. If 'page' is unique, update your schema accordingly.
  // For now, assuming 'id' is the unique field and is provided in the request data:
  if (!data.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const seo = await prisma.sEO.upsert({
    where: { id: data.id },
    update: { title, description, keywords, image, page },
    create: { page, title, description, keywords, image },
  });
  return NextResponse.json(seo, { status: 200 });
}
