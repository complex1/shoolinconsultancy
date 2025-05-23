import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        order: 'asc'
      }
    });
    
    // For admin panel, return the full team member records
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // This endpoint would typically be protected by authentication in a real app
    
    // Parse the request body
    const body = await request.json();
    const { name, position, bio, imageUrl, order } = body;
    
    // Validate required fields
    if (!name || !position || !bio) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the team member
    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        position,
        bio,
        imageUrl: imageUrl || null,
        order: order || 999,
      },
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Team member created successfully',
      id: teamMember.id,
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
