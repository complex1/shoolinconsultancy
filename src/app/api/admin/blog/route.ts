/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../lib/sqlite";
import { BlogEntity } from "../../../../entities/blog.entity";
import { calculateReadTime, generateSlug } from "@/entities/blog.entity";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(BlogEntity);
}

export async function GET(request: NextRequest) {
  try {
    const blogRepository = await ensureDbInitialized();
    
    // Fetch all blogs with complete author details
    const blogs = await blogRepository.find({
      relations: {
        author: true
      },
      order: {
        createdAt: 'DESC'
      }
    });

    console.log("Fetched blogs with author details:", JSON.stringify(blogs.slice(0, 1), null, 2));

    // Return the list of blogs
    return NextResponse.json({
      success: true,
      data: blogs
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch blogs"
    }, { status: 500 });
  }
}

// Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const blogRepository = await ensureDbInitialized();
    const blogData = await request.json();

    // Apply preprocessing - generate slug if not provided
    if (!blogData.slug && blogData.title) {
      blogData.slug = generateSlug(blogData.title);
    }
    
    // Calculate read time if content is provided and read time isn't set
    if (blogData.content && !blogData.readTime) {
      blogData.readTime = calculateReadTime(blogData.content);
    }
    
    // Create date objects for date fields if they're strings
    if (blogData.publishedAt && typeof blogData.publishedAt === 'string') {
      blogData.publishedAt = new Date(blogData.publishedAt);
    }

    const newBlog = blogRepository.create(blogData);
    const savedBlog = await blogRepository.save(newBlog);

    // Fetch the complete blog with author details
    const completeNewBlog = await blogRepository.findOne({
      where: { id: savedBlog[0].id },
      relations: { author: true }
    });

    return NextResponse.json({
      success: true,
      data: completeNewBlog
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create blog"
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const blogRepository = await ensureDbInitialized();
    const blogData = await request.json();
    const { id, ...updateData } = blogData;

    // Update the blog post
    await blogRepository.save({
      id,
      ...updateData
    });

    // Fetch the updated blog with author details
    const updatedBlog = await blogRepository.findOne({
      where: { id },
      relations: { author: true }
    });

    return NextResponse.json({
      success: true,
      data: updatedBlog
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update blog"
    }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const blogRepository = await ensureDbInitialized();
    const { id } = await request.json();

    // Delete the blog post
    const result = await blogRepository.delete(id);

    if (result.affected === 0) {
      return NextResponse.json({
        success: false,
        message: "Blog not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete blog"
    }, { status: 500 });
  }
}
