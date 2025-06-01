/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../lib/sqlite";
import { UserEntity } from "@/entities/user.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(UserEntity);
}

export async function GET(request: NextRequest) {
  try {
    const userRepository = await ensureDbInitialized();
    
    // Fetch all users who can be authors
    const users = await userRepository.find({
      order: {
        name: 'ASC'
      }
    });

    // Return the list of users
    return NextResponse.json({
      success: true,
      data: users
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch users"
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, role, image, bio, linkedin, twitter } = body;

    // Validate required fields
    if (!name || !role || !bio) {
      return NextResponse.json({
        success: false,
        message: "Name, role, and bio are required"
      }, { status: 400 });
    }
    
    // Create a new user entity
    const user = new UserEntity();
    user.name = name;
    user.role = role;
    user.image = image || '';
    user.bio = bio;
    user.linkedin = linkedin || '';
    user.twitter = twitter || '';

    // Save the new user to the database
    const savedUser = await AppDataSource.getRepository(UserEntity).save(user);
    
    return NextResponse.json({
      success: true,
      data: savedUser
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create user"
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { id, name, role, image, bio, linkedin, twitter } = body;
    
    // Validate required fields
    if (!id || !name || !role || !bio) {
      return NextResponse.json({
        success: false,
        message: "ID, name, role, and bio are required"
      }, { status: 400 });
    }

    
    // Find the user by ID
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOneBy({ id });
    
    // Check if user exists
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 });
    }
    
    // Update user properties
    user.name = name;
    user.role = role;
    user.image = image || '';
    user.bio = bio;
    user.linkedin = linkedin || '';
    user.twitter = twitter || '';
    
    // Save the updated user to the database
    const updatedUser = await userRepository.save(user);
    
    return NextResponse.json({
      success: true,
      data: updatedUser
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update user"
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { id } = body;
    
    // Validate required fields
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID is required"
      }, { status: 400 });
    }
    
    
    // Find the user by ID
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOneBy({ id });
    
    // Check if user exists
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 });
    }
    
    // Delete the user from the database
    await userRepository.remove(user);
    
    return NextResponse.json({
      success: true,
      message: "User deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete user"
    }, { status: 500 });
  }
}

// Note: The above code assumes that the UserEntity is defined in the entities/user.entities file