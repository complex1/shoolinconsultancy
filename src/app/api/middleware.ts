import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "../../lib/api-utils";

/**
 * Middleware to handle CORS for API routes
 */
export function middleware(request: NextRequest): NextResponse {
  // Handle preflight requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 }); // No content
    return corsHeaders(response);
  }

  // Continue with the request - CORS headers will be added in the route handlers
  return NextResponse.next();
}

/**
 * Middleware configuration - apply to all API routes
 */
export const config = {
  matcher: ['/api/:path*'],
};
