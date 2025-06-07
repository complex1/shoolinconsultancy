import { NextRequest } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import { BlogEntity } from "../../../../entities/blog.entity";
import { 
  getPaginationParams,
  getFilterParams, 
  getPaginatedResults, 
  handleApiError, 
  corsResponse, 
  handleOptionsRequest 
} from "../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch blogs with pagination and filtering
 * Supports filters: status, tags (comma-separated)
 * Example: /api/public/blog?page=1&limit=10&status=published&tags=law,business
 */
export async function GET(request: NextRequest) {
  try {
    // Get repository
    const blogRepository = await getRepository<BlogEntity>(BlogEntity);
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (fields that are allowed to be filtered)
    const baseFilters = getFilterParams(request, ['status']);
    
    // Build filters
    const filters = { ...baseFilters };
    
    // Additional filter processing
    const url = new URL(request.url);
    
    // Handle tags filter (comma-separated tags)
    const tagsParam = url.searchParams.get('tags');
    if (tagsParam) {
      const tags = tagsParam.split(',');
      // For SQLite, we need a workaround since it doesn't support array contains
      // This is not efficient but works for demonstration
      const blogsWithTags = await blogRepository.createQueryBuilder('blog')
        .where('blog.tags LIKE :tag', { tag: `%${tags[0]}%` })
        .getMany();
        
      const filteredIds = blogsWithTags
        .filter(blog => tags.every(tag => blog.tags.includes(tag)))
        .map(blog => blog.id);
        
      if (filteredIds.length > 0) {
        filters.id = filteredIds;
      } else {
        // Return empty result if no blogs match the tags
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
    
    // Process search term if provided
    const searchTerm = url.searchParams.get('search');
    if (searchTerm) {
      const matchingBlogs = await blogRepository.createQueryBuilder('blog')
        .where('blog.title LIKE :search OR blog.content LIKE :search OR blog.excerpt LIKE :search', 
          { search: `%${searchTerm}%` })
        .getMany();
        
      const searchResultIds = matchingBlogs.map(blog => blog.id);
      
      if (searchResultIds.length > 0) {
        filters.id = Array.isArray(filters.id) ?
          // If we already have IDs from tag filtering, find the intersection
          filters.id.filter((id: string) => searchResultIds.includes(id)) :
          searchResultIds;
      } else {
        // Return empty result if no blogs match the search term
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

    // Set default order - newest first
    const orderBy = { publishedAt: 'DESC' as const, createdAt: 'DESC' as const };
    
    // Get paginated results
    const result = await getPaginatedResults(blogRepository, paginationParams, filters, orderBy);
    
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
