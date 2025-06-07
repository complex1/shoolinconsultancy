import { NextRequest } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import NewsletterEntity from "../../../../entities/newsletter.entities";
import { 
  getPaginationParams, 
  getFilterParams, 
  getPaginatedResults, 
  handleApiError,
  corsResponse,
  handleOptionsRequest 
} from "../../../../lib/api-utils";

/**
 * GET - Admin endpoint to fetch newsletter subscribers with pagination and filtering
 * Supports filters: isSubscribed
 * Example: /api/admin/newsletter?page=1&limit=10&isSubscribed=true
 * Note: This endpoint should be protected with authentication in a real-world scenario
 */
export async function GET(request: NextRequest) {
  try {
    // Get repository
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (fields that are allowed to be filtered)
    const filters = getFilterParams(request, ['isSubscribed']);
    
    // Additional filter processing
    const url = new URL(request.url);
    
    // Process search term if provided (search by email)
    const searchTerm = url.searchParams.get('search');
    if (searchTerm) {
      const matchingSubscriptions = await newsletterRepository.createQueryBuilder('newsletter')
        .where('newsletter.email LIKE :search', { search: `%${searchTerm}%` })
        .getMany();
        
      const searchResultIds = matchingSubscriptions.map(sub => sub.id);
      
      if (searchResultIds.length > 0) {
        filters.id = searchResultIds;
      } else {
        // Return empty result if no subscriptions match the search term
        return corsResponse({
          success: true,
          data: [],
          meta: {
            page: paginationParams.page,
            limit: paginationParams.limit,
            totalCount: 0,
            totalPages: 0
          }
        });
      }
    }
    
    // Set default order - newest subscribers first
    const orderBy = { joinedAt: 'DESC' as const };
    
    // Get paginated results
    const result = await getPaginatedResults(newsletterRepository, paginationParams, filters, orderBy);
    
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
 * DELETE - Delete multiple newsletter subscriptions
 */
export async function DELETE(request: NextRequest) {
  try {
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    const { ids } = await request.json();
    
    // Validate IDs array
    if (!Array.isArray(ids) || ids.length === 0) {
      return corsResponse({
        success: false,
        message: "Expected an array of subscription IDs to delete"
      }, { status: 400 });
    }
    
    // Delete subscriptions
    const result = await newsletterRepository.delete(ids);
    
    return corsResponse({
      success: true,
      message: `Successfully deleted ${result.affected || 0} subscriptions`
    }, { status: 200 });
  } catch (error) {
    const { status } = handleApiError(error);
    return corsResponse({
      success: false,
      message: "Failed to delete subscriptions"
    }, { status });
  }
}

/**
 * OPTIONS - Handle CORS preflight requests
 */
export function OPTIONS() {
  return handleOptionsRequest();
}
