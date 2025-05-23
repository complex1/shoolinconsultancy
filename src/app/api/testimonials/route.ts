// API route handler for testimonials
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const featuredOnly = searchParams.get('featured') === 'true';
    
    // Parse limit (default to 10 if not provided or invalid)
    const limit = limitParam ? parseInt(limitParam, 10) || 10 : 10;

    // Build query
    const where = featuredOnly ? { featured: true } : {};

    // Get testimonials from database
    const testimonials = await prisma.testimonial.findMany({
      where,
      take: limit,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Return the testimonials
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // This endpoint would typically be protected by authentication in a real app
    // You would add middleware or check for an API key here
    
    // Parse the request body
    const body = await req.json();
    const { name, position, company, content, rating, imageUrl, featured } = body;
    
    // Validate required fields
    if (!name || !position || !company || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Store testimonial in the database
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        position,
        company,
        content,
        rating: rating || 5,
        imageUrl,
        featured: featured || false,
      },
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Testimonial created successfully',
      id: testimonial.id,
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
