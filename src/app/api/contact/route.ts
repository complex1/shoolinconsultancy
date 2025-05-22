// API route handler for contact form submissions
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, phone, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store submission in the database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || '',  // Handle optional phone field
        subject,
        message,
      },
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: submission.id,
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process contact submission' },
      { status: 500 }
    );
  }
}

// GET handler to retrieve contact form submissions
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    
    // Parse limit (default to 100 if not provided or invalid)
    const limit = limitParam ? parseInt(limitParam, 10) || 100 : 100;

    // Get contact form submissions from database
    const submissions = await prisma.contactSubmission.findMany({
      take: limit,
      orderBy: [
        { createdAt: 'desc' },
      ],
    });

    // Return the submissions
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
