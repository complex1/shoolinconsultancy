/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../lib/sqlite";
import { EnquiryEntity } from "../../../../entities/enquiry.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(EnquiryEntity);
}

// GET - Fetch enquiries with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const enquiryRepository = await ensureDbInitialized();
    
    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const status = url.searchParams.get('status');
    const service = url.searchParams.get('service');
    const isResolved = url.searchParams.get('isResolved');
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'DESC';
    
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    
    // Prepare find options
    const findOptions: {
      order: Record<string, 'ASC' | 'DESC'>;
      where: Record<string, any>;
      skip: number;
      take: number;
    } = {
      order: { [sortBy]: sortOrder === 'ASC' ? 'ASC' : 'DESC' },
      where: {},
      skip: offset,
      take: limit
    };
    
    // Apply filters if provided
    if (status) {
      findOptions.where.status = status;
    }
    
    if (service) {
      findOptions.where.service = service;
    }
    
    if (isResolved !== null) {
      findOptions.where.isResolved = isResolved === 'true';
    }
    
    // Count total enquiries that match filters (for pagination)
    const totalCount = await enquiryRepository.count({
      where: findOptions.where
    });
    
    // Fetch enquiries with pagination
    const enquiries = await enquiryRepository.find(findOptions);
    
    console.log(`Found ${enquiries.length} enquiries out of ${totalCount} total`);
    
    // Return paginated results with metadata
    return NextResponse.json({
      success: true,
      data: enquiries,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch enquiries"
    }, { status: 500 });
  }
}

// POST - Create a new enquiry from contact form
export async function POST(request: NextRequest) {
  try {
    const enquiryRepository = await ensureDbInitialized();
    const enquiryData = await request.json();
    
    // Validate required fields
    if (!enquiryData.name || !enquiryData.email || !enquiryData.phone || !enquiryData.message) {
      return NextResponse.json({
        success: false,
        message: "Name, email, phone, and message are required fields"
      }, { status: 400 });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enquiryData.email)) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid email address"
      }, { status: 400 });
    }
    
    // Basic phone validation (allow various formats but ensure some digits)
    const phoneRegex = /\d{6,}/;  // At least 6 digits
    if (!phoneRegex.test(enquiryData.phone.replace(/\D/g, ''))) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid phone number"
      }, { status: 400 });
    }
    
    // Create new enquiry with defaults for admin fields
    const newEnquiry = enquiryRepository.create({
      ...enquiryData,
      status: 'new',
      isResolved: false
    });
    
    const savedEnquiry = await enquiryRepository.save(newEnquiry);
    
    // Return success with the saved enquiry data
    return NextResponse.json({
      success: true,
      data: savedEnquiry
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to submit enquiry"
    }, { status: 500 });
  }
}
