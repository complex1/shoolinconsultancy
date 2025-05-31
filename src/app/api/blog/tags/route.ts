// API route handler for blog tags
import { NextResponse } from 'next/server';

// Static tag data
const staticTags = [
  { id: '1', name: 'Corporate Law' },
  { id: '2', name: 'Taxation' },
  { id: '3', name: 'Finance' },
  { id: '4', name: 'Intellectual Property' },
  { id: '5', name: 'Startups' },
  { id: '6', name: 'Business Law' },
  { id: '7', name: 'Litigation' },
  { id: '8', name: 'Employment Law' }
];

export async function GET() {
  try {
    // Return static tags
    return NextResponse.json(staticTags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
