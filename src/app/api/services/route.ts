// API route handler for services
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    
    // If slug is provided, fetch a single service
    if (slug) {
      const service = await prisma.service.findUnique({
        where: { slug },
      });
      
      if (!service) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(service);
    }
    
    // Otherwise, fetch all services
    const featuredOnly = searchParams.get('featured') === 'true';
    
    // Build query
    const where = featuredOnly ? { featured: true } : {};
    
    const services = await prisma.service.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { title: 'asc' },
      ],
    });
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// This would typically be protected in a real application
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { title, description, longDescription, iconUrl, slug, featured } = body;
    
    // Validate required fields
    if (!title || !description || !longDescription || !iconUrl || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Check if slug already exists
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });
    
    if (existingService) {
      return NextResponse.json(
        { error: 'Service with this slug already exists' },
        { status: 409 }
      );
    }
    
    // Create the service
    const service = await prisma.service.create({
      data: {
        title,
        description,
        longDescription,
        iconUrl,
        slug,
        featured: featured || false,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Service created successfully',
      id: service.id,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
