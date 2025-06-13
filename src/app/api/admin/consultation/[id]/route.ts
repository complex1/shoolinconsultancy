import { NextRequest } from "next/server";
import { AppDataSource, initDB } from "@/lib/sqlite";
import { ConsultationEntity, ConsultationStatus } from "@/entities/consultation.entities";
import { corsResponse, handleOptionsRequest } from "@/lib/api-utils";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(ConsultationEntity);
}

// Helper to get a consultation request by ID
async function getConsultationById(id: string) {
  const consultationRepo = await ensureDbInitialized();
  return consultationRepo.findOneBy({ id });
}

// GET: Fetch a single consultation request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const consultation = await getConsultationById(id);

    if (!consultation) {
      return corsResponse({
        success: false,
        message: "Consultation request not found"
      }, { status: 404 });
    }

    return corsResponse({
      success: true,
      data: consultation
    }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching consultation request with ID ${id}:`, error);
    return corsResponse({
      success: false,
      message: "Failed to fetch consultation request"
    }, { status: 500 });
  }
}

// PATCH: Update a consultation request (status, notes, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const consultationRepo = await ensureDbInitialized();
    const consultation = await getConsultationById(id);

    if (!consultation) {
      return corsResponse({
        success: false,
        message: "Consultation request not found"
      }, { status: 404 });
    }

    const data = await request.json();
    
    // Update allowed fields
    if (data.status !== undefined) {
      // Validate status
      if (!Object.values(ConsultationStatus).includes(data.status)) {
        return corsResponse({
          success: false,
          message: "Invalid status value"
        }, { status: 400 });
      }
      consultation.status = data.status;
    }
    
    // Allow updating the selected date and time
    if (data.selectedDate !== undefined) {
      consultation.selectedDate = new Date(data.selectedDate);
    }
    
    if (data.selectedTime !== undefined) {
      consultation.selectedTime = data.selectedTime;
    }
    
    // Update attorney assignment
    if (data.attorney !== undefined) {
      consultation.attorney = data.attorney;
    }
    
    // Update admin notes
    if (data.adminNotes !== undefined) {
      consultation.adminNotes = data.adminNotes;
    }
    
    // Save the updated consultation request
    const updatedConsultation = await consultationRepo.save(consultation);
    
    return corsResponse({
      success: true,
      data: updatedConsultation,
      message: "Consultation request updated successfully"
    }, { status: 200 });
  } catch (error) {
    console.error(`Error updating consultation request with ID ${id}:`, error);
    return corsResponse({
      success: false,
      message: "Failed to update consultation request"
    }, { status: 500 });
  }
}

// DELETE: Remove a consultation request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const consultationRepo = await ensureDbInitialized();
    const consultation = await getConsultationById(id);

    if (!consultation) {
      return corsResponse({
        success: false,
        message: "Consultation request not found"
      }, { status: 404 });
    }

    // Delete the consultation request
    await consultationRepo.remove(consultation);
    
    return corsResponse({
      success: true,
      message: "Consultation request deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting consultation request with ID ${id}:`, error);
    return corsResponse({
      success: false,
      message: "Failed to delete consultation request"
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}
