import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Use Node.js runtime instead of Edge for Prisma compatibility
export const runtime = 'nodejs';

// Simple admin API endpoint for checking database status
// This is a placeholder - in a real app, this would require authentication
export async function GET() {
  try {
    // Get counts of different entities in the database
    const serviceCount = await prisma.service.count();
    const testimonialCount = await prisma.testimonial.count();
    const teamMemberCount = await prisma.teamMember.count();
    const blogPostCount = await prisma.blogPost.count();
    const contactSubmissionCount = await prisma.contactSubmission.count();
    const tagCount = await prisma.tag.count();
    
    return NextResponse.json({
      status: 'operational',
      database: {
        services: serviceCount,
        testimonials: testimonialCount,
        teamMembers: teamMemberCount,
        blogPosts: blogPostCount,
        contactSubmissions: contactSubmissionCount,
        tags: tagCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error accessing admin API:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Failed to access database', 
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
