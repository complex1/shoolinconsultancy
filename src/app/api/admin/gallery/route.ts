import { NextRequest } from "next/server";
import { AppDataSource, initDB } from "@/lib/sqlite";
import { In } from "typeorm";
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

// GET: List all gallery media items with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const mediaRepository = await ensureDbInitialized();
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters
    const allowedFilters = ['type', 'isActive'];
    const filters = getFilterParams(request, allowedFilters);
    
    // Get paginated results with sorting by display order and creation date
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

// POST: Create a new gallery media item
export async function POST(request: NextRequest) {
  try {
    const mediaRepository = await ensureDbInitialized();
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['type', 'src', 'alt', 'caption'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return corsResponse({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Create and save the new gallery media item
    const newMediaItem = mediaRepository.create({
      type: data.type,
      src: data.src,
      alt: data.alt,
      caption: data.caption,
      poster: data.poster || null,
      isActive: data.isActive !== undefined ? data.isActive : true,
      displayOrder: data.displayOrder !== undefined ? data.displayOrder : 0
    });
    
    const savedMedia = await mediaRepository.save(newMediaItem);
    
    return corsResponse({
      success: true,
      data: savedMedia,
      message: "Gallery media item created successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery media item:", error);
    return corsResponse({
      success: false,
      message: "Failed to create gallery media item"
    }, { status: 500 });
  }
}

// DELETE: Delete multiple gallery media items
export async function DELETE(request: NextRequest) {
  try {
    const mediaRepository = await ensureDbInitialized();
    const { ids } = await request.json();
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return corsResponse({
        success: false,
        message: "No valid IDs provided for deletion"
      }, { status: 400 });
    }

    // Find all the media items to delete
    const mediaItems = await mediaRepository.findBy({
      id: In(ids)
    });
    
    if (mediaItems.length === 0) {
      return corsResponse({
        success: false,
        message: "No matching media items found for deletion"
      }, { status: 404 });
    }
    
    // Delete the media items
    await mediaRepository.remove(mediaItems);
    
    return corsResponse({
      success: true,
      message: `Successfully deleted ${mediaItems.length} gallery media items`
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting gallery media items:", error);
    return corsResponse({
      success: false,
      message: "Failed to delete gallery media items"
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}
