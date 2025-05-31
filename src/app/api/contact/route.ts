import { NextRequest, NextResponse } from 'next/server';

// Contact form submission handler

export async function GET() {
  // Return an error since contact submissions should not be publicly accessible
  return NextResponse.json(
    { error: 'Access restricted' },
    { status: 403 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real application, we would store the submission and perhaps send an email
    // Since we've removed the database, we'll just return a success message
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
