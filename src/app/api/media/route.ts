import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    // Return static media data
    return NextResponse.json(staticMedia);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Media uploads are disabled' },
    { status: 403 }
  );
}
