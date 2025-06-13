import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../../lib/sqlite";
import { ServiceEntity } from "../../../../../entities/services.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(ServiceEntity);
}

// GET - Fetch a single service by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const serviceRepository = await ensureDbInitialized();
    const id = parseInt((await params).id);
    
    // Validate ID
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid service ID"
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
    
    // Return the service
    return NextResponse.json({
      success: true,
      data: service
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch service"
    }, { status: 500 });
  }
}

// PATCH - Update specific fields of a service
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const serviceRepository = await ensureDbInitialized();
    const id = parseInt((await params).id);
    const updates = await request.json();
    
    // Validate ID
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid service ID"
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
    
    // Check if slug is being changed and verify it's unique
    if (updates.slug && updates.slug !== service.slug) {
      const slugExists = await serviceRepository.findOne({
        where: { slug: updates.slug }
      });
      
      if (slugExists) {
        return NextResponse.json({
          success: false,
          message: "A service with this slug already exists"
        }, { status: 409 });
      }
    }
    
    // Apply updates
    Object.assign(service, updates);
    const updatedService = await serviceRepository.save(service);
    
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

// DELETE - Delete a service by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const serviceRepository = await ensureDbInitialized();
    const id = parseInt((await params).id);
    
    // Validate ID
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid service ID"
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
