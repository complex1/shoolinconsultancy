import { NextRequest, NextResponse } from 'next/server';

// Static team data
const staticTeamMembers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    position: 'Senior Partner',
    bio: 'Over 20 years of experience in corporate and international law. Graduated from National Law School of India University.',
    imageUrl: '/team/attorney1.svg',
    order: 1,
    email: 'rajesh.kumar@shoolin.com',
    phone: '+91 98765 43210',
    specializations: ['Corporate Law', 'International Law', 'Mergers & Acquisitions'],
    education: 'LL.B., National Law School of India University',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    name: 'Priya Sharma',
    position: 'Managing Partner',
    bio: 'Specializes in intellectual property and technology law. Previously worked with leading firms in Delhi and Mumbai.',
    imageUrl: '/team/attorney2.svg',
    order: 2,
    email: 'priya.sharma@shoolin.com',
    phone: '+91 98765 43211',
    specializations: ['Intellectual Property', 'Technology Law', 'Data Privacy'],
    education: 'LL.M. in IP Law, Delhi University',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    name: 'Rahul Singh',
    position: 'Associate Partner',
    bio: 'Expert in taxation and financial regulations. Has represented major corporations in high-stakes litigation.',
    imageUrl: '/team/attorney1.svg',
    order: 3,
    email: 'rahul.singh@shoolin.com',
    phone: '+91 98765 43212',
    specializations: ['Taxation', 'Financial Regulations', 'Corporate Litigation'],
    education: 'LL.B., Mumbai University; Chartered Accountant',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Find team member with the matching ID
    const teamMember = staticTeamMembers.find(member => member.id === id);
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Team member updates are disabled' },
    { status: 403 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Team member deletion is disabled' },
    { status: 403 }
  );
}
