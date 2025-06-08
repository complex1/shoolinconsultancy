import { NextRequest } from "next/server";
import { AppDataSource, initDB } from "@/lib/sqlite";
import { GalleryMediaEntity } from "@/entities/galleryMedia.entities";
import { 
  getPaginationParams, 
  getFilterParams, 
  getPaginatedResults,
  corsResponse,
  handleOptionsRequest
} from "@/lib/api-utils";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(GalleryMediaEntity);
}

/**
 * GET: Public endpoint to retrieve gallery media items
 * Supports pagination, filtering by type, and only returns active items
 */
export async function GET(request: NextRequest) {
  try {
    const mediaRepository = await ensureDbInitialized();
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (only type is allowed for public API)
    const allowedFilters = ['type'];
    const filters = getFilterParams(request, allowedFilters);
    
    // Always filter by active status for public API
    filters.isActive = true;
    
    // Get paginated results sorted by display order
    const paginatedResults = await getPaginatedResults(mediaRepository, paginationParams, filters, {
      displayOrder: 'ASC',
      createdAt: 'DESC'
    });

    return corsResponse({
      success: true,
      ...paginatedResults
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching gallery media items:", error);
    return corsResponse({
      success: false,
      message: "Failed to fetch gallery media items"
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}
