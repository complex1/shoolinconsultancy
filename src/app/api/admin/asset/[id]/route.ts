import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../../lib/sqlite";
import { AssetEntity } from "../../../../../entities/assets.entity";
import path from 'path';

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(AssetEntity);
}

// GET - Fetch a single asset by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assetRepository = await ensureDbInitialized();
    const id = params.id;
    
    // Find the asset
    const asset = await assetRepository.findOne({
      where: { id }
    });
    
    if (!asset) {
      return NextResponse.json({
        success: false,
        message: "Asset not found"
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: asset
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching asset:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch asset"
    }, { status: 500 });
  }
}

// PATCH - Update asset metadata (name, alt text, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assetRepository = await ensureDbInitialized();
    const id = params.id;
    const updates = await request.json();
    
    // Find the asset
    const asset = await assetRepository.findOne({
      where: { id }
    });
    
    if (!asset) {
      return NextResponse.json({
        success: false,
        message: "Asset not found"
      }, { status: 404 });
    }
    
    // Prevent updating certain fields
    delete updates.url; // URL cannot be changed
    delete updates.isSvg; // SVG status cannot be changed
    delete updates.svgCode; // SVG code cannot be changed via PATCH
    
    // Update asset
    Object.assign(asset, updates);
    const updatedAsset = await assetRepository.save(asset);
    
    return NextResponse.json({
      success: true,
      data: updatedAsset
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating asset:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update asset"
    }, { status: 500 });
  }
}

// DELETE - Delete a single asset
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assetRepository = await ensureDbInitialized();
    const id = params.id;
    
    // Find the asset
    const asset = await assetRepository.findOne({
      where: { id }
    });
    
    if (!asset) {
      return NextResponse.json({
        success: false,
        message: "Asset not found"
      }, { status: 404 });
    }
    
    // Delete the asset from the database
    await assetRepository.remove(asset);
    
    // Try to delete the physical file if it's a local file
    if (!asset.url.startsWith('http')) {
      try {
        import('fs').then(async (fs) => {
          const filePath = path.join(process.cwd(), 'public', asset.url);
          if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
          }
        });
      } catch (fileError) {
        console.error("Error deleting file:", fileError);
        // Continue execution even if file deletion fails
      }
    }
    
    return NextResponse.json({
      success: true,
      message: "Asset deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting asset:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete asset"
    }, { status: 500 });
  }
}
