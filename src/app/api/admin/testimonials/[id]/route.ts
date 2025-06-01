import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../../lib/sqlite";
import { TestimonialEntity } from "../../../../../entities/testimonials.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(TestimonialEntity);
}

// GET - Fetch a single testimonial by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonialRepository = await ensureDbInitialized();
    const id = params.id;
    
    // Find the testimonial
    const testimonial = await testimonialRepository.findOne({
      where: { id }
    });
    
    // Check if testimonial exists
    if (!testimonial) {
      return NextResponse.json({
        success: false,
        message: "Testimonial not found"
      }, { status: 404 });
    }
    
    // Return the testimonial
    return NextResponse.json({
      success: true,
      data: testimonial
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch testimonial"
    }, { status: 500 });
  }
}

// PATCH - Update a single testimonial by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonialRepository = await ensureDbInitialized();
    const id = params.id;
    const updateData = await request.json();
    
    // Find the testimonial
    const testimonial = await testimonialRepository.findOne({
      where: { id }
    });
    
    // Check if testimonial exists
    if (!testimonial) {
      return NextResponse.json({
        success: false,
        message: "Testimonial not found"
      }, { status: 404 });
    }
    
    // Update the testimonial
    Object.assign(testimonial, updateData);
    const updatedTestimonial = await testimonialRepository.save(testimonial);
    
    // Return the updated testimonial
    return NextResponse.json({
      success: true,
      data: updatedTestimonial
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update testimonial"
    }, { status: 500 });
  }
}

// DELETE - Delete a single testimonial by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonialRepository = await ensureDbInitialized();
    const id = params.id;
    
    // Find the testimonial
    const testimonial = await testimonialRepository.findOne({
      where: { id }
    });
    
    // Check if testimonial exists
    if (!testimonial) {
      return NextResponse.json({
        success: false,
        message: "Testimonial not found"
      }, { status: 404 });
    }
    
    // Delete the testimonial
    await testimonialRepository.remove(testimonial);
    
    // Return success
    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete testimonial"
    }, { status: 500 });
  }
}
