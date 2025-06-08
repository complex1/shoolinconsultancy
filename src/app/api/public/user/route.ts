/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../lib/sqlite";
import { Like } from "typeorm";
import { UserEntity } from "@/entities/user.entities";
import { 
  getPaginationParams, 
  getFilterParams, 
  getPaginatedResults,
  corsResponse,
  handleOptionsRequest
} from "@/lib/api-utils";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(UserEntity);
}

export async function GET(request: NextRequest) {
  try {
    const userRepository = await ensureDbInitialized();
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (searching by name, role, etc.)
    const allowedFilters = ['name', 'role', 'email'];
    const filters = getFilterParams(request, allowedFilters);
    
    // Handle search parameter
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search');
    
    if (searchTerm) {
      // Add search condition - search in name or email fields
      const searchConditions: Array<Record<string, unknown>> = [
        { name: Like(`%${searchTerm}%`) },
        { email: Like(`%${searchTerm}%`) }
      ];
      
      if (Object.keys(filters).length > 0) {
        // Combine search with other filters
        filters[0] = searchConditions;
      } else {
        filters[0] = searchConditions;
      }
    }
    
    // Get paginated results with sorting
    const paginatedResults = await getPaginatedResults(userRepository, paginationParams, filters, {
      name: 'ASC'
    });

    // Return the paginated list of users
    return corsResponse({
      success: true,
      ...paginatedResults
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return corsResponse({
      success: false,
      message: "Failed to fetch users"
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}