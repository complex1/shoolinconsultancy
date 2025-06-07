/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectLiteral, Repository } from "typeorm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Common pagination parameters extracted from URL query parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

/**
 * Extract pagination parameters from request URL
 */
export function getPaginationParams(request: NextRequest): PaginationParams {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
}

/**
 * Extract filter parameters from request URL based on entity fields
 * @param request - The Next.js request object
 * @param allowedFilters - Array of field names that can be used for filtering
 * @returns An object containing filter conditions
 */
export function getFilterParams(request: NextRequest, allowedFilters: string[]): Record<string, unknown> {
  const url = new URL(request.url);
  const filters: Record<string, unknown> = {};
  
  // Process each allowed filter
  for (const filterName of allowedFilters) {
    const filterValue = url.searchParams.get(filterName);
    if (filterValue !== null) {
      // Handle special case for boolean values
      if (filterValue.toLowerCase() === 'true') {
        filters[filterName] = true;
      } else if (filterValue.toLowerCase() === 'false') {
        filters[filterName] = false;
      } else {
        filters[filterName] = filterValue;
      }
    }
  }
  
  // Handle special case for active status across entities
  const activeOnly = url.searchParams.get('activeOnly');
  if (activeOnly === 'true') {
    if (allowedFilters.includes('isActive')) {
      filters.isActive = true;
    } else if (allowedFilters.includes('status')) {
      filters.status = 'published';
    }
  }
  
  return filters;
}

/**
 * Generic function to handle paginated results for any entity
 */
import type { FindOptionsOrder } from "typeorm";

export async function getPaginatedResults<T extends ObjectLiteral>(
  repository: Repository<T>, 
  paginationParams: PaginationParams,
  filters: Record<string, unknown> = {},
  orderBy: FindOptionsOrder<T> = { } as FindOptionsOrder<T>
) {
  // Build where clause
  const whereClause = Object.keys(filters).length > 0 ? filters : undefined;
  
  // Get total count for pagination
  const totalCount = await repository.count({
    where: whereClause as any
  });
  
  // Execute query using pagination
  const results = await repository.find({
    where: whereClause as any,
    order: orderBy,
    skip: paginationParams.offset,
    take: paginationParams.limit
  });
  
  // Return the paginated list with metadata
  return {
    data: results,
    meta: {
      page: paginationParams.page,
      limit: paginationParams.limit,
      totalCount,
      totalPages: Math.ceil(totalCount / paginationParams.limit)
    }
  };
}

/**
 * Error handler for API routes
 */
export function handleApiError(error: unknown): { message: string, status: number } {
  console.error("API Error:", error);
  
  if (error instanceof Error) {
    // Database connection error
    if (error.message.includes('Connection')) {
      return {
        message: "Database connection error. Please try again.",
        status: 503 // Service Unavailable
      };
    }
    
    // Not found error
    if (error.message.includes('not found')) {
      return {
        message: error.message,
        status: 404 // Not Found
      };
    }
    
    return {
      message: error.message,
      status: 500 // Internal Server Error
    };
  }
  
  return {
    message: "An unknown error occurred",
    status: 500 // Internal Server Error
  };
}

/**
 * Adds CORS headers to the response
 * @param response - The NextResponse object
 * @returns The NextResponse object with CORS headers
 */
export function corsHeaders(response: NextResponse): NextResponse {
  // Allow any origin, method, and header
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours in seconds
  
  return response;
}

/**
 * Creates a response with CORS headers
 * @param data - The data to include in the response
 * @param options - Response options including status
 * @returns A NextResponse with CORS headers
 */
export function corsResponse(data: any, options?: { status?: number }): NextResponse {
  const response = NextResponse.json(data, options);
  return corsHeaders(response);
}

/**
 * Handles OPTIONS requests for CORS preflight
 * @returns A NextResponse for OPTIONS requests
 */
export function handleOptionsRequest(): NextResponse {
  const response = new NextResponse(null, { status: 204 }); // No content
  return corsHeaders(response);
}
