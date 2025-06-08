import { NextRequest } from "next/server";
import { AppDataSource, initDB } from "@/lib/sqlite";
import { ConsultationEntity, ConsultationStatus } from "@/entities/consultation.entities";
import { corsResponse, handleOptionsRequest } from "@/lib/api-utils";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(ConsultationEntity);
}

// POST: Create a new consultation request
export async function POST(request: NextRequest) {
  try {
    const consultationRepo = await ensureDbInitialized();
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'message', 'selectedDate', 'selectedTime', 'attorney'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return corsResponse({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate that terms were accepted
    if (!data.agreeToTerms) {
      return corsResponse({
        success: false,
        message: "You must agree to the terms and conditions"
      }, { status: 400 });
    }

    // Create new consultation entity
    const consultation = new ConsultationEntity();
    consultation.name = data.name;
    consultation.email = data.email;
    consultation.phone = data.phone;
    consultation.message = data.message;
    consultation.agreeToTerms = data.agreeToTerms;
    consultation.selectedDate = new Date(data.selectedDate);
    consultation.selectedTime = data.selectedTime;
    consultation.attorney = data.attorney;
    consultation.status = ConsultationStatus.PENDING;
    
    // Save to database
    const savedConsultation = await consultationRepo.save(consultation);
    
    return corsResponse({
      success: true,
      message: "Consultation request submitted successfully",
      data: {
        id: savedConsultation.id,
        name: savedConsultation.name,
        email: savedConsultation.email,
        selectedDate: savedConsultation.selectedDate,
        selectedTime: savedConsultation.selectedTime,
      }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating consultation request:", error);
    return corsResponse({
      success: false,
      message: "Failed to submit consultation request. Please try again later."
    }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return handleOptionsRequest();
}
