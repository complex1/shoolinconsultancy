import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, password } = body;

    // Check if credentials match
    if (username === "admin" && password === "admin") {
      // Successful login
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: { username: "admin", role: "administrator" }
      }, { status: 200 });
    } else {
      // Invalid credentials
      return NextResponse.json({
        success: false,
        message: "Invalid username or password"
      }, { status: 401 });
    }
  } catch (error) {
    // Error handling
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred during login"
    }, { status: 500 });
  }
}
