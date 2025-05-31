import { NextRequest, NextResponse } from 'next/server';

// Static media data
const staticMedia = [
  {
    id: '1',
    title: 'Company Logo',
    description: 'Official logo of Shoolin Consultancy',
    type: 'image',
    url: '/uploads/media/logo.png',
    filename: 'logo.png',
    filetype: 'image/png',
    size: 45678,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    title: 'Office Brochure',
    description: 'Corporate brochure with service details',
    type: 'document',
    url: '/uploads/media/brochure.pdf',
    filename: 'brochure.pdf',
    filetype: 'application/pdf',
    size: 2345678,
    createdAt: new Date('2025-02-10'),
    updatedAt: new Date('2025-02-10')
  },
  {
    id: '3',
    title: 'Corporate Profile',
    description: 'Company profile and team information',
    type: 'image',
    url: '/uploads/media/profile.jpg',
    filename: 'profile.jpg',
    filetype: 'image/jpeg',
    size: 156789,
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-05')
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Find media with the matching ID
    const media = staticMedia.find(media => media.id === id);
    
    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Media updates are disabled' },
    { status: 403 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Media deletion is disabled' },
    { status: 403 }
  );
}
