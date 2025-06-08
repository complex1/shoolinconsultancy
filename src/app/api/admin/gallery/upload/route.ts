import { NextRequest } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { corsResponse, handleOptionsRequest } from "@/lib/api-utils";

// Helper function to ensure upload directory exists
async function ensureUploadDirectoryExists(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
  return dir;
}

// POST - Upload a media file (image or video)
export async function POST(request: NextRequest) {
  try {
    // Check content type
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return corsResponse({
        success: false,
        message: "Content-Type must be multipart/form-data"
      }, { status: 400 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'image'; // 'image' or 'video'
    
    if (!file) {
      console.error("Upload error: No file provided");
      return corsResponse({
        success: false,
        message: "No file uploaded"
      }, { status: 400 });
    }
    
    // Check if type is valid
    if (type !== 'image' && type !== 'video') {
      return corsResponse({
        success: false,
        message: "Invalid media type. Must be 'image' or 'video'"
      }, { status: 400 });
    }
    
    // Validate file type
    const fileType = file.type.split('/')[0]; // 'image' or 'video'
    if (fileType !== type) {
      console.error(`Upload error: File type mismatch. Expected ${type}, got ${fileType}`);
      return corsResponse({
        success: false,
        message: `File type mismatch. Expected ${type}, got ${fileType}`
      }, { status: 400 });
    }
    
    // Check file size (limit to 15MB)
    const MAX_SIZE = 15 * 1024 * 1024; // 15MB
    if (file.size > MAX_SIZE) {
      return corsResponse({
        success: false, 
        message: `File size exceeds the limit of 15MB`
      }, { status: 400 });
    }
    
    // Create target directory based on media type
    const targetDir = type === 'video' ? 'videos' : 'images';
    const uploadDir = path.join(process.cwd(), 'uploads', targetDir);
    
    console.log(`Upload directory path: ${uploadDir}`);
    await ensureUploadDirectoryExists(uploadDir);
    
    // Generate unique filename - ensure no spaces or special characters
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '-').toLowerCase();
    const fileExtension = path.extname(originalName);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);
    
    console.log(`Saving file as: ${filePath}`);
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Write file to disk
    await writeFile(filePath, buffer);
    console.log(`File saved successfully: ${fileName}`);
    
    // Create response with file URL
    const fileUrl = `/${targetDir}/${fileName}`;
    
    // For videos, we don't have an automatic thumbnail generator
    // but for future extension, we'll include the field in the response
    const thumbnailUrl = type === 'video' ? null : fileUrl;
    
    return corsResponse({
      success: true,
      data: {
        url: fileUrl,
        type: fileType,
        filename: fileName,
        size: file.size,
        originalName: originalName,
        thumbnailUrl: thumbnailUrl
      }
    }, { status: 201 });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error uploading media file:", errorMessage);
    
    // Check if it's a permission error
    const isPermissionError = errorMessage.includes('EACCES') || errorMessage.includes('permission');
    
    return corsResponse({
      success: false,
      message: isPermissionError 
        ? "Server file permission error. Please contact administrator." 
        : "Failed to upload media file",
      error: errorMessage
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}
