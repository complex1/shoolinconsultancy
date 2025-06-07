import { NextRequest } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import { TestimonialEntity } from "../../../../entities/testimonials.entities";
import { 
  getPaginationParams, 
  getFilterParams, 
  getPaginatedResults, 
  handleApiError,
  corsResponse,
  handleOptionsRequest 
} from "../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch testimonials with pagination and filtering
 * Supports filters: isActive, category, platform, rating
 * Example: /api/public/testimonials?page=1&limit=10&isActive=true&category=corporate&rating=5
 */
export async function GET(request: NextRequest) {
  try {
    // Get repository
    const testimonialRepository = await getRepository<TestimonialEntity>(TestimonialEntity);
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (fields that are allowed to be filtered)
    const filters = getFilterParams(request, ['isActive', 'category', 'platform', 'rating']);
    
    // Only show active testimonials by default in public API
    if (filters.isActive === undefined) {
      filters.isActive = true;
    }
    
    // Set default order - by display order then creation date
    const orderBy = { displayOrder: 'ASC' as const, createdAt: 'DESC' as const };
    
    // Get paginated results
    const result = await getPaginatedResults(testimonialRepository, paginationParams, filters, orderBy);
    
    return corsResponse({
      success: true,
      ...result
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
