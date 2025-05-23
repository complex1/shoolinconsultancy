import { NextRequest, NextResponse } from 'next/server';
import prisma, { handleApiError, runtime } from '@/lib/prisma-api';
import * as bcrypt from 'bcryptjs';

// Use runtime from prisma-api helper
export { runtime };

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Find the user by username
    const user = await prisma.adminUser.findUnique({
      where: { username }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Create a simplified user object without password
    const safeUser = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };
    
    // In a real-world app, you would create a JWT token here
    // For simplicity, we'll just return the user info
    return NextResponse.json({
      user: safeUser,
      message: 'Login successful'
    });
    
  } catch (error) {
    return handleApiError(error, 'Login error');
  }
}
