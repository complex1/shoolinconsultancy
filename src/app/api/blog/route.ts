import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    
    // Transform the data to simplify the structure for the frontend
    const formattedPosts = posts.map((post: typeof posts[number]) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      slug: post.slug,
      imageUrl: post.imageUrl,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map((tag: { tag: { name: string } }) => tag.tag.name)
    }));
    
    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { title, slug, content, excerpt, imageUrl, published, authorId, tags } = body;
    
    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'Blog post with this slug already exists' },
        { status: 409 }
      );
    }
    
    // Start a transaction to create the post and its tags
    const newPost = await prisma.$transaction(async (prisma: typeof import('@prisma/client').PrismaClient) => {
      // Create the blog post
      const post = await prisma.blogPost.create({
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
      
      // Create tag relations if tags are provided
      if (tags && Array.isArray(tags) && tags.length > 0) {
        // Process each tag
        for (const tagName of tags) {
          // Check if tag exists or create it
          let tag = await prisma.tag.findUnique({
            where: { name: tagName },
          });
          
          if (!tag) {
            tag = await prisma.tag.create({
              data: { name: tagName }
            });
          }
          
          // Create relation between post and tag
          await prisma.blogPostTag.create({
            data: {
              postId: post.id,
              tagId: tag.id
            }
          });
        }
      }
      
      return post;
    });
    
    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      post: newPost,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
