// API route handler for blog tags
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get all tags from the database
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Return the tags
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
