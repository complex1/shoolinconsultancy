import { NextRequest } from "next/server";
import { AppDataSource, initDB } from "@/lib/sqlite";
import { In } from "typeorm";
import { ConsultationEntity } from "@/entities/consultation.entities";
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
  return AppDataSource.getRepository(ConsultationEntity);
}

// GET: List all consultation requests with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const consultationRepo = await ensureDbInitialized();
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters
    const allowedFilters = ['status', 'attorney'];
    const filters = getFilterParams(request, allowedFilters);
    
    // Handle search parameter (search in name, email, phone)
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    
    // Create query builder to handle more complex search
    if (search) {
      // Start with base query
      const queryBuilder = consultationRepo.createQueryBuilder('consultation');
      
      // Add search conditions
      queryBuilder.where('consultation.name LIKE :search OR consultation.email LIKE :search OR consultation.phone LIKE :search', 
        { search: `%${search}%` });
      
      // Add any other filters
      Object.entries(filters).forEach(([key, value]) => {
        queryBuilder.andWhere(`consultation.${key} = :${key}`, { [key]: value });
      });
      
      // Add sorting
      queryBuilder.orderBy('consultation.createdAt', 'DESC');
      
      // Add pagination
      queryBuilder.skip(paginationParams.offset);
      queryBuilder.take(paginationParams.limit);
      
      // Execute query
      const [results, totalCount] = await queryBuilder.getManyAndCount();
      
      return corsResponse({
        success: true,
        data: results,
        meta: {
          page: paginationParams.page,
          limit: paginationParams.limit,
          totalCount,
          totalPages: Math.ceil(totalCount / paginationParams.limit)
        }
      }, { status: 200 });
    }
    
    // If no search param, use standard pagination
    const paginatedResults = await getPaginatedResults(consultationRepo, paginationParams, filters, {
      createdAt: 'DESC'
    });

    return corsResponse({
      success: true,
      ...paginatedResults
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching consultation requests:", error);
    return corsResponse({
      success: false,
      message: "Failed to fetch consultation requests"
    }, { status: 500 });
  }
}

// DELETE: Delete multiple consultation requests
export async function DELETE(request: NextRequest) {
  try {
    const consultationRepo = await ensureDbInitialized();
    const { ids } = await request.json();
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return corsResponse({
        success: false,
        message: "No valid IDs provided for deletion"
      }, { status: 400 });
    }

    // Find all the consultation requests to delete
    const consultations = await consultationRepo.findBy({
      id: In(ids)
    });
    
    if (consultations.length === 0) {
      return corsResponse({
        success: false,
        message: "No matching consultation requests found for deletion"
      }, { status: 404 });
    }
    
    // Delete the consultation requests
    await consultationRepo.remove(consultations);
    
    return corsResponse({
      success: true,
      message: `Successfully deleted ${consultations.length} consultation requests`
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting consultation requests:", error);
    return corsResponse({
      success: false,
      message: "Failed to delete consultation requests"
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}
