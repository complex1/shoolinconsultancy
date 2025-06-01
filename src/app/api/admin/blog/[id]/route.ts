import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource, initDB } from '../../../../../lib/sqlite';
import { BlogEntity } from '../../../../../entities/blog.entity';

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(BlogEntity);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogRepository = await ensureDbInitialized();
    const id = params.id;
    
    const blog = await blogRepository.findOne({ where: { id } });
    
    if (!blog) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: blog
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch blog'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogRepository = await ensureDbInitialized();
    const id = params.id;
    const blogData = await request.json();
    
    // Check if blog exists
    const existingBlog = await blogRepository.findOne({ where: { id } });
    
    if (!existingBlog) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }
    
    // Update the blog
    const updatedBlog = await blogRepository.save({
      ...existingBlog,
      ...blogData,
      id // Ensure ID remains the same
    });
    
    return NextResponse.json({
      success: true,
      data: updatedBlog
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update blog'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogRepository = await ensureDbInitialized();
    const id = params.id;
    
    // Check if blog exists
    const existingBlog = await blogRepository.findOne({ where: { id } });
    
    if (!existingBlog) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }
    
    // Delete the blog
    await blogRepository.remove(existingBlog);
    
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete blog'
    }, { status: 500 });
  }
}
