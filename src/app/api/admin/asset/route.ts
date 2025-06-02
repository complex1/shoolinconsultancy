import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../lib/sqlite";
import { AssetEntity, createAsset } from "../../../../entities/assets.entity";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(AssetEntity);
}

// Helper function to ensure upload directory exists
async function ensureUploadDirectoryExists(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  return dir;
}

// GET - Fetch assets with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const assetRepository = await ensureDbInitialized();
    
    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const type = url.searchParams.get('type');
    const isSvg = url.searchParams.get('isSvg');
    const search = url.searchParams.get('search');
    
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    
    // Build query with filters
    let queryBuilder = assetRepository.createQueryBuilder('asset');
    
    // Apply filters
    if (type) {
      queryBuilder = queryBuilder.andWhere('asset.type = :type', { type });
    }
    
    if (isSvg !== null) {
      queryBuilder = queryBuilder.andWhere('asset.isSvg = :isSvg', { isSvg: isSvg === 'true' });
    }
    
    if (search) {
      queryBuilder = queryBuilder.andWhere('asset.name LIKE :search', { search: `%${search}%` });
    }
    
    // Add pagination
    const totalCount = await queryBuilder.getCount();
    
    queryBuilder = queryBuilder
      .orderBy('asset.createdAt', 'DESC')
      .skip(offset)
      .take(limit);
    
    // Execute query
    const assets = await queryBuilder.getMany();
    
    console.log(`Found ${assets.length} assets out of ${totalCount} total`);
    
    // Return paginated results with metadata
    return NextResponse.json({
      success: true,
      data: assets,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch assets"
    }, { status: 500 });
  }
}

// POST - Create a new asset (handle both file uploads and SVG code)
export async function POST(request: NextRequest) {
  try {
    const assetRepository = await ensureDbInitialized();
    
    // Check if the request is multipart form data or JSON
    const contentType = request.headers.get('content-type') || '';
    
    // Handle file upload case
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const name = formData.get('name') as string || file.name;
      const alt = formData.get('alt') as string || '';
      
      if (!file) {
        return NextResponse.json({
          success: false,
          message: "No file uploaded"
        }, { status: 400 });
      }
      
      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await ensureUploadDirectoryExists(uploadDir);
      
      // Generate unique filename
      const fileExtension = path.extname(file.name);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);
      
      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Write file to disk
      await writeFile(filePath, buffer);
      
      // Check if it's an SVG file
      const isSvg = fileExtension.toLowerCase() === '.svg';
      
      // Create asset record
      const assetData = {
        name: name,
        url: `/uploads/${fileName}`,
        isSvg: isSvg,
        svgCode: isSvg ? buffer.toString('utf-8') : undefined,
        type: file.type,
        size: file.size,
        alt: alt
      };
      
      const newAsset = createAsset(assetData);
      const savedAsset = await assetRepository.save(newAsset);
      
      return NextResponse.json({
        success: true,
        data: savedAsset
      }, { status: 201 });
    } 
    // Handle JSON submission case (for SVG code or external URLs)
    else {
      const data = await request.json();
      
      // Validate required fields
      if (!data.name) {
        return NextResponse.json({
          success: false,
          message: "Name and URL are required fields"
        }, { status: 400 });
      }
      
      // If SVG code is provided
      if (data.isSvg && data.svgCode) {
        // Check if it's an external URL or we need to save the SVG code
        if (data.url.startsWith('http')) {
          // Use external URL
        } else {
          // Save SVG code to file
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          await ensureUploadDirectoryExists(uploadDir);
          
          // Generate unique filename
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.svg`;
          const filePath = path.join(uploadDir, fileName);
          
          // Write SVG code to file
          await writeFile(filePath, data.svgCode);
          
          // Update URL to point to the saved file
          data.url = `/uploads/${fileName}`;
        }
      }
      
      // Create asset record
      const newAsset = createAsset(data);
      const savedAsset = await assetRepository.save(newAsset);
      
      return NextResponse.json({
        success: true,
        data: savedAsset
      }, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating asset:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create asset"
    }, { status: 500 });
  }
}

// DELETE - Delete multiple assets
export async function DELETE(request: NextRequest) {
  try {
    const assetRepository = await ensureDbInitialized();
    const { ids } = await request.json();
    
    // Validate IDs array
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Expected an array of asset IDs to delete"
      }, { status: 400 });
    }
    
    // Fetch assets to get their file paths
    const { In } = await import("typeorm");
    const assetsToDelete = await assetRepository.findBy({ id: In(ids) });
    
    // Delete assets from database
    const result = await assetRepository.delete(ids);
    
    // Attempt to delete physical files (if they exist)
    try {
      import('fs').then(async (fs) => {
        for (const asset of assetsToDelete) {
          // Only delete local files, not external URLs
          if (asset.url && !asset.url.startsWith('http')) {
            const filePath = path.join(process.cwd(), 'public', asset.url);
            if (fs.existsSync(filePath)) {
              await fs.promises.unlink(filePath);
            }
          }
        }
      });
    } catch (fileError) {
      console.error("Error deleting asset files:", fileError);
      // Continue execution even if file deletion fails
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.affected || 0} assets`
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting assets:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete assets"
    }, { status: 500 });
  }
}
