import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import EnquiryEntity from "../../../../entities/enquiry.entities";
import { getPaginationParams, getFilterParams, getPaginatedResults, handleApiError } from "../../../../lib/api-utils";

/**
 * GET - Endpoint to fetch enquiries with pagination and filtering
 * Note: This should be protected with authentication in a real application
 * Supports filters: status, isResolved, service
 * Example: /api/public/enquiry?page=1&limit=10&status=pending&isResolved=false
 */
export async function GET(request: NextRequest) {
  try {
    // IMPORTANT: In a real application, you should check authentication here
    // This is just for demonstration purposes
    // const session = await getSession(request);
    // if (!session || !session.user) {
    //   return NextResponse.json({
    //     success: false,
    //     message: "Authentication required"
    //   }, { status: 401 });
    // }
    
    // Get repository
    const enquiryRepository = await getRepository<EnquiryEntity>(EnquiryEntity);
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (fields that are allowed to be filtered)
    const filters = getFilterParams(request, ['status', 'isResolved', 'service']);
    
    // Set default order - newest first
    const orderBy = { createdAt: 'DESC' as const };
    
    // Get paginated results
    const result = await getPaginatedResults(enquiryRepository, paginationParams, filters, orderBy);
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    const { message, status } = handleApiError(error);
    return NextResponse.json({
      success: false,
      message
    }, { status });
  }
}
