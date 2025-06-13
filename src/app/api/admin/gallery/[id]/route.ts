import { NextRequest } from "next/server";
import { AppDataSource, initDB } from "@/lib/sqlite";
import { GalleryMediaEntity } from "@/entities/galleryMedia.entities";
import { 
  corsResponse,
  handleOptionsRequest
} from "@/lib/api-utils";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(GalleryMediaEntity);
}

// Helper to get a gallery media item by ID
async function getGalleryMediaById(id: string) {
  const mediaRepository = await ensureDbInitialized();
  return mediaRepository.findOneBy({ id });
}

// GET: Fetch a single gallery media item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const _params = await params;
  try {
    const mediaItem = await getGalleryMediaById(_params.id);
    
    if (!mediaItem) {
      return corsResponse({
        success: false,
        message: "Gallery media item not found"
      }, { status: 404 });
    }

    return corsResponse({
      success: true,
      data: mediaItem
    }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching gallery media item with ID ${_params.id}:`, error);
    return corsResponse({
      success: false,
      message: "Failed to fetch gallery media item"
    }, { status: 500 });
  }
}

// PATCH: Update a gallery media item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const _params = await params;
  try {
    const mediaRepository = await ensureDbInitialized();
    const mediaItem = await getGalleryMediaById(_params.id);

    if (!mediaItem) {
      return corsResponse({
        success: false,
        message: "Gallery media item not found"
      }, { status: 404 });
    }

    const data = await request.json();
    
    // Update the media item fields
    if (data.type !== undefined) mediaItem.type = data.type;
    if (data.src !== undefined) mediaItem.src = data.src;
    if (data.alt !== undefined) mediaItem.alt = data.alt;
    if (data.caption !== undefined) mediaItem.caption = data.caption;
    if (data.poster !== undefined) mediaItem.poster = data.poster;
    if (data.isActive !== undefined) mediaItem.isActive = data.isActive;
    if (data.displayOrder !== undefined) mediaItem.displayOrder = data.displayOrder;
    
    // Save the updated media item
    const updatedMedia = await mediaRepository.save(mediaItem);
    
    return corsResponse({
      success: true,
      data: updatedMedia,
      message: "Gallery media item updated successfully"
    }, { status: 200 });
  } catch (error) {
    console.error(`Error updating gallery media item with ID ${_params.id}:`, error);
    return corsResponse({
      success: false,
      message: "Failed to update gallery media item"
    }, { status: 500 });
  }
}

// DELETE: Remove a gallery media item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const _params = await params;
  try {
    const mediaRepository = await ensureDbInitialized();
    const mediaItem = await getGalleryMediaById(_params.id);

    if (!mediaItem) {
      return corsResponse({
        success: false,
        message: "Gallery media item not found"
      }, { status: 404 });
    }

    // Delete the media item
    await mediaRepository.remove(mediaItem);
    
    return corsResponse({
      success: true,
      message: "Gallery media item deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting gallery media item with ID ${_params.id}:`, error);
    return corsResponse({
      success: false,
      message: "Failed to delete gallery media item"
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}
