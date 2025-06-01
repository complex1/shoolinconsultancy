import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../../../lib/sqlite";
import { ServiceEntity } from "../../../../../../entities/services.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(ServiceEntity);
}

// GET - Fetch a service by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const serviceRepository = await ensureDbInitialized();
    const { slug } = params;
    
    // Find the service by slug
    const service = await serviceRepository.findOne({
      where: { slug }
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
    console.error("Error fetching service by slug:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch service"
    }, { status: 500 });
  }
}
