import { NextRequest } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import ServiceEntity from "../../../../entities/services.entities";
import { 
  getPaginationParams, 
  getFilterParams, 
  getPaginatedResults, 
  handleApiError, 
  corsResponse, 
  handleOptionsRequest 
} from "../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch services with pagination and filtering
 * Supports filters: isActive, featured
 * Example: /api/public/services?page=1&limit=10&isActive=true&featured=true
 */
export async function GET(request: NextRequest) {
  try {
    // Get repository
    const serviceRepository = await getRepository<ServiceEntity>(ServiceEntity);
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (fields that are allowed to be filtered)
    const filters = getFilterParams(request, ['isActive', 'featured']);
    
    // Set default order - by display order
    const orderBy = { displayOrder: 'ASC' as const, createdAt: 'DESC' as const };
    
    // Get paginated results
    const result = await getPaginatedResults(serviceRepository, paginationParams, filters, orderBy);
    
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
