import { NextRequest } from "next/server";
import { getRepository } from "../../../../../lib/sqlite";
import { TestimonialEntity } from "../../../../../entities/testimonials.entities";
import { handleApiError, corsResponse, handleOptionsRequest } from "../../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch a single testimonial by ID
 * URL: /api/public/testimonials/:id
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get repository
    const testimonialRepository = await getRepository<TestimonialEntity>(TestimonialEntity);
    
    // Find testimonial by ID
    const testimonial = await testimonialRepository.findOne({
      where: { id }
    });
    
    if (!testimonial) {
      return corsResponse({
        success: false,
        message: `Testimonial with ID ${id} not found`
      }, { status: 404 });
    }
    
    // For public API, only return active testimonials
    if (!testimonial.isActive) {
      return corsResponse({
        success: false,
        message: `Testimonial with ID ${id} is not available`
      }, { status: 404 });
    }
    
    return corsResponse({
      success: true,
      data: testimonial
    });
  } catch (error) {
    const { message, status } = handleApiError(error);
    return corsResponse({
      success: false,
      message
    }, { status });
  }
}

/**
 * OPTIONS - Handle CORS preflight requests
 */
export function OPTIONS() {
  return handleOptionsRequest();
}
