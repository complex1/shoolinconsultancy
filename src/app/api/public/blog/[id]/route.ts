import { NextRequest } from "next/server";
import { getRepository } from "../../../../../lib/sqlite";
import { BlogEntity } from "../../../../../entities/blog.entity";
import { handleApiError, corsResponse, handleOptionsRequest } from "../../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch a single blog by ID
 * URL: /api/public/blog/:id
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Get repository
    const blogRepository = await getRepository<BlogEntity>(BlogEntity);
    
    // Find blog by ID
    const blog = await blogRepository.findOne({
      where: { id },
      relations: ['author'] // Include the author relation
    });
    
    if (!blog) {
      return corsResponse({
        success: false,
        message: `Blog with ID ${id} not found`
      }, { status: 404 });
    }
    
    return corsResponse({
      success: true,
      data: blog
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
