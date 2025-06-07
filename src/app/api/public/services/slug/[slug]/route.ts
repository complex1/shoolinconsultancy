import { NextRequest } from "next/server";
import { getRepository } from "../../../../../../lib/sqlite";
import ServiceEntity from "../../../../../../entities/services.entities";
import { handleApiError, corsResponse, handleOptionsRequest } from "../../../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch a single service by slug
 * URL: /api/public/services/slug/:slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Get repository
    const serviceRepository = await getRepository<ServiceEntity>(ServiceEntity);
    
    // Find service by slug
    const service = await serviceRepository.findOne({
      where: { slug }
    });
    
    if (!service) {
      return corsResponse({
        success: false,
        message: `Service with slug "${slug}" not found`
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
