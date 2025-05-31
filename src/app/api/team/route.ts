import { NextResponse } from 'next/server';

// Static team data
const staticTeamMembers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    position: 'Senior Partner',
    bio: 'Over 20 years of experience in corporate and international law. Graduated from National Law School of India University.',
    imageUrl: '/team/attorney1.svg',
    order: 1
  },
  {
    id: '2',
    name: 'Priya Sharma',
    position: 'Managing Partner',
    bio: 'Specializes in intellectual property and technology law. Previously worked with leading firms in Delhi and Mumbai.',
    imageUrl: '/team/attorney2.svg',
    order: 2
  },
  {
    id: '3',
    name: 'Rahul Singh',
    position: 'Associate Partner',
    bio: 'Expert in taxation and financial regulations. Has represented major corporations in high-stakes litigation.',
    imageUrl: '/team/attorney1.svg',
    order: 3
  }
];

export async function GET() {
  try {
    return NextResponse.json(staticTeamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {    
    return NextResponse.json(
      { error: 'Team member creation is disabled' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
