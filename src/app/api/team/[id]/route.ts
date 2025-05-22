import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid team member ID' },
        { status: 400 }
      );
    }
    
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });
    
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid team member ID' },
        { status: 400 }
      );
    }
    
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
    
    // Check if team member exists
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Update the team member
    const updatedTeamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        position,
        bio,
        imageUrl,
        order: order || 999, // Default to a high number if not provided
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully',
      teamMember: updatedTeamMember,
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid team member ID' },
        { status: 400 }
      );
    }
    
    // Check if team member exists
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Check if the team member has associated blog posts
    const postsCount = await prisma.blogPost.count({
      where: { authorId: id }
    });
    
    if (postsCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete team member with associated blog posts. Please reassign or delete those posts first.' },
        { status: 409 }
      );
    }
    
    // Delete the team member
    await prisma.teamMember.delete({
      where: { id },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
