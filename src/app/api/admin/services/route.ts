/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../lib/sqlite";
import { ServiceEntity } from "../../../../entities/services.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(ServiceEntity);
}

// GET - Fetch all services with optional filtering
export async function GET(request: NextRequest) {
  try {
    const serviceRepository = await ensureDbInitialized();
    
    // Get query parameters
    const url = new URL(request.url);
    const featured = url.searchParams.get('featured') === 'true';
    const activeOnly = url.searchParams.get('activeOnly') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;
    
    // Prepare find options
    const findOptions: {
      order: { displayOrder: 'ASC'; title: 'ASC' };
      where: Record<string, any>;
      skip?: number;
      take?: number;
    } = {
      order: {
        displayOrder: 'ASC',
        title: 'ASC'
      },
      where: {},
      skip: offset,
      take: limit
    };
    
    // Apply filters if specified
    if (featured) {
      findOptions.where.featured = true;
    }
    
    if (activeOnly) {
      findOptions.where.isActive = true;
    }
    
    // Get total count for pagination
    const totalCount = await serviceRepository.count({
      where: findOptions.where
    });
    
    // Execute query with pagination
    const services = await serviceRepository.find(findOptions);
    
    console.log(`Found ${services.length} services out of ${totalCount} total`);
    
    // Return the paginated list of services with metadata
    return NextResponse.json({
      success: true,
      data: services,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch services"
    }, { status: 500 });
  }
}

// POST - Create a new service
export async function POST(request: NextRequest) {
  try {
    const serviceRepository = await ensureDbInitialized();
    const serviceData = await request.json();
    
    // Validate required fields
    if (!serviceData.title || !serviceData.description || !serviceData.iconUrl) {
      return NextResponse.json({
        success: false,
        message: "Title, description, and iconUrl are required fields"
      }, { status: 400 });
    }
    
    // Generate slug if not provided
    if (!serviceData.slug && serviceData.title) {
      serviceData.slug = serviceData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
    
    // Check if slug already exists
    const existingService = await serviceRepository.findOne({
      where: { slug: serviceData.slug }
    });
    
    if (existingService) {
      return NextResponse.json({
        success: false,
        message: "A service with this slug already exists"
      }, { status: 409 });
    }
    
    // Create new service
    const newService = serviceRepository.create(serviceData);
    const savedService = await serviceRepository.save(newService);
    
    return NextResponse.json({
      success: true,
      data: savedService
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create service"
    }, { status: 500 });
  }
}

// PUT - Update a service
export async function PUT(request: NextRequest) {
  try {
    const serviceRepository = await ensureDbInitialized();
    const serviceData = await request.json();
    
    // Validate input has ID
    if (!serviceData.id) {
      return NextResponse.json({
        success: false,
        message: "Service ID is required for updates"
      }, { status: 400 });
    }
    
    // Find existing service
    const existingService = await serviceRepository.findOne({
      where: { id: serviceData.id }
    });
    
    if (!existingService) {
      return NextResponse.json({
        success: false,
        message: "Service not found"
      }, { status: 404 });
    }
    
    // Check if slug is being changed and ensure it's unique
    if (serviceData.slug !== existingService.slug) {
      const slugExists = await serviceRepository.findOne({
        where: { slug: serviceData.slug }
      });
      
      if (slugExists) {
        return NextResponse.json({
          success: false,
          message: "A service with this slug already exists"
        }, { status: 409 });
      }
    }
    
    // Update service
    Object.assign(existingService, serviceData);
    const updatedService = await serviceRepository.save(existingService);
    
    return NextResponse.json({
      success: true,
      data: updatedService
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update service"
    }, { status: 500 });
  }
}

// DELETE - Delete a service
export async function DELETE(request: NextRequest) {
  try {
    const serviceRepository = await ensureDbInitialized();
    const { id } = await request.json();
    
    // Validate ID is provided
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Service ID is required for deletion"
      }, { status: 400 });
    }
    
    // Find the service
    const service = await serviceRepository.findOne({
      where: { id }
    });
    
    if (!service) {
      return NextResponse.json({
        success: false,
        message: "Service not found"
      }, { status: 404 });
    }
    
    // Delete the service
    await serviceRepository.remove(service);
    
    return NextResponse.json({
      success: true,
      message: "Service deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete service"
    }, { status: 500 });
  }
}
