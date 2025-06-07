/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import { TestimonialEntity } from "../../../../entities/testimonials.entities";

// GET - Fetch all testimonials
export async function GET(request: NextRequest) {
  try {
    console.log("GET /api/admin/testimonials - Initializing database connection");
    const testimonialRepository = await getRepository<TestimonialEntity>(TestimonialEntity);
    console.log("Database connection established successfully");
    
    // Get query parameters
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const activeOnly = url.searchParams.get('activeOnly') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;
    
    // Prepare find options
    const findOptions: {
      order: { displayOrder: 'ASC' | 'DESC'; createdAt: 'ASC' | 'DESC' };
      where: Record<string, any>;
      skip?: number;
      take?: number;
    } = {
      order: {
        displayOrder: 'ASC',
        createdAt: 'DESC'
      },
      where: {},
      skip: offset,
      take: limit
    };
    
    // Apply filters if specified
    if (category) {
      findOptions.where.category = category;
    }
    
    if (activeOnly) {
      findOptions.where.isActive = true;
    }
    
    // Get total count for pagination
    const totalCount = await testimonialRepository.count({
      where: findOptions.where
    });
    
    // Execute query using pagination
    const testimonials = await testimonialRepository.find(findOptions);
    
    console.log(`Found ${testimonials.length} testimonials out of ${totalCount} total`);
    
    // Return the paginated list of testimonials with metadata
    return NextResponse.json({
      success: true,
      data: testimonials,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    
    // Provide more specific error messages based on the error type
    if (error instanceof Error && error.message.includes("Connection")) {
      return NextResponse.json({
        success: false,
        message: "Database connection error. Please try again.",
        error: error.message
      }, { status: 503 }); // Service Unavailable
    }
    
    return NextResponse.json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// POST - Create a new testimonial
export async function POST(request: NextRequest) {
  try {
    const testimonialRepository = await getRepository<TestimonialEntity>(TestimonialEntity);
    const testimonialData = await request.json();
    
    // Validate required fields
    if (!testimonialData.name || !testimonialData.position || !testimonialData.text || !testimonialData.category) {
      return NextResponse.json({
        success: false,
        message: "Name, position, text, and category are required fields"
      }, { status: 400 });
    }
    
    // Create new testimonial
    const newTestimonial = testimonialRepository.create(testimonialData);
    const savedTestimonial = await testimonialRepository.save(newTestimonial);
    
    return NextResponse.json({
      success: true,
      data: savedTestimonial
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create testimonial"
    }, { status: 500 });
  }
}

// PUT - Update multiple testimonials (for batch operations like reordering)
export async function PUT(request: NextRequest) {
  try {
    const testimonialRepository = await getRepository<TestimonialEntity>(TestimonialEntity);
    const updates = await request.json();
    
    // Validate input format
    if (!Array.isArray(updates)) {
      return NextResponse.json({
        success: false,
        message: "Expected an array of testimonials to update"
      }, { status: 400 });
    }
    
    // Update each testimonial
    const updatedTestimonials = await Promise.all(
      updates.map(async (update) => {
        if (!update.id) {
          throw new Error("Each testimonial must have an ID");
        }
        
        // Find and update the testimonial
        await testimonialRepository.update(update.id, update);
        return testimonialRepository.findOne({ where: { id: update.id } });
      })
    );
    
    return NextResponse.json({
      success: true,
      data: updatedTestimonials
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonials:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update testimonials"
    }, { status: 500 });
  }
}

// DELETE - Delete multiple testimonials
export async function DELETE(request: NextRequest) {
  try {
    const testimonialRepository = await getRepository<TestimonialEntity>(TestimonialEntity);
    const { ids } = await request.json();
    
    // Validate IDs array
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Expected an array of testimonial IDs to delete"
      }, { status: 400 });
    }
    
    // Delete testimonials
    const result = await testimonialRepository.delete(ids);
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.affected || 0} testimonials`
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting testimonials:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete testimonials"
    }, { status: 500 });
  }
}
