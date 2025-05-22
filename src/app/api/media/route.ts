import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Function to get a list of all media files
export async function GET(request: NextRequest) {
  try {
    const media = await prisma.media.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(media, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

// Function to handle file uploads
export async function POST(request: NextRequest) {
  try {
    // Parse the FormData
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const altText = formData.get('altText') as string | null;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate a unique filename to prevent overwriting
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const relativePath = `/uploads/media/${uniqueFilename}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Define the full path where the file will be saved
    const filePath = path.join(process.cwd(), 'public', relativePath);
    
    // Write the file to disk
    await writeFile(filePath, buffer);
    
    // Create a record in the database
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        filepath: relativePath,
        mimetype: file.type,
        size: file.size,
        title: title || file.name,
        description: description || '',
        altText: altText || '',
      }
    });
    
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
