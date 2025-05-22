import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }
    
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: true,
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Transform the data to simplify the structure for the frontend
    const formattedPost = {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      slug: post.slug,
      imageUrl: post.imageUrl,
      published: post.published,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map((tag: { tag: { name: string } }) => tag.tag.name)
    };
    
    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { title, slug, content, excerpt, imageUrl, published, authorId, tags, originalSlug } = body;
    
    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Check if post exists
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // If slug has changed, check if new slug already exists
    if (slug !== originalSlug) {
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug },
      });
      
      if (existingPost && existingPost.id !== id) {
        return NextResponse.json(
          { error: 'Blog post with this slug already exists' },
          { status: 409 }
        );
      }
    }
    
    // Start a transaction to update the post and its tags
    // Import PrismaClient type at the top if not already imported
    // import { PrismaClient } from '@prisma/client';

    const updatedPost = await prisma.$transaction(async (prisma: typeof import('@prisma/client').PrismaClient) => {
      // First, delete existing tag relations
      await prisma.blogPostTag.deleteMany({
        where: { postId: id }
      });
      
      // Then update the post
      const updated = await prisma.blogPost.update({
        where: { id },
        data: {
          title,
          slug,
          content,
          excerpt,
          imageUrl,
          published: published || false,
          authorId: authorId || null,
        },
      });
      
      // Add new tag relations if tags are provided
      if (tags && Array.isArray(tags) && tags.length > 0) {
        await Promise.all(tags.map((tagId: number) => 
          prisma.blogPostTag.create({
            data: {
              postId: id,
              tagId: tagId
            }
          })
        ));
      }
      
      return updated;
    });
    
    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog post ID' },
        { status: 400 }
      );
    }
    
    // Check if blog post exists
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Delete the blog post and its tag relations in a transaction
    await prisma.$transaction(async (prisma: import('@prisma/client').PrismaClient) => {
      // First delete tag relations
      await prisma.blogPostTag.deleteMany({
        where: { postId: id }
      });
      
      // Then delete the post
      await prisma.blogPost.delete({
        where: { id },
      });
    });
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
