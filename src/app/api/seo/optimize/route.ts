import { NextRequest, NextResponse } from 'next/server';
import { SeoOptimizer } from '@/lib/seo/optimizer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, title, description, pageType } = body;

    if (!url || !title || !description || !pageType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate SEO metadata
    const metadata = SeoOptimizer.generateSeoMetadata(
      title,
      description,
      url,
      pageType,
      body.location
    );

    return NextResponse.json({
      success: true,
      message: 'SEO metadata generated successfully',
      metadata
    });
  } catch (error) {
    console.error('Error in SEO optimization:', error);
    return NextResponse.json(
      { error: 'Failed to optimize page SEO' },
      { status: 500 }
    );
  }
}
