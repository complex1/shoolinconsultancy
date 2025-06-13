import { NextRequest } from "next/server";
import { getRepository } from "../../../../../lib/sqlite";
import ServiceEntity from "../../../../../entities/services.entities";
import { handleApiError, corsResponse, handleOptionsRequest } from "../../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch a single service by ID
 * URL: /api/public/services/:id
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id, 10);
    
    if (isNaN(id)) {
      return corsResponse({
        success: false,
        message: "Invalid ID format"
      }, { status: 400 });
    }
    
    // Get repository
    const serviceRepository = await getRepository<ServiceEntity>(ServiceEntity);
    
    // Find service by ID
    const service = await serviceRepository.findOne({
      where: { id }
    });
    
    if (!service) {
      return corsResponse({
        success: false,
        message: `Service with ID ${id} not found`
      }, { status: 404 });
    }
    
    return corsResponse({
      success: true,
      data: service
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
