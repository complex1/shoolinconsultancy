import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../lib/sqlite";
import { EnquiryEntity, createEnquiry } from "../../../entities/enquiry.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(EnquiryEntity);
}

// POST - Submit a new enquiry from the public website
export async function POST(request: NextRequest) {
  try {
    const enquiryRepository = await ensureDbInitialized();
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return NextResponse.json({
        success: false,
        message: "Please fill in all required fields"
      }, { status: 400 });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid email address"
      }, { status: 400 });
    }
    
    // Create the enquiry using the helper function
    const enquiry = createEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service || 'General Enquiry',
      message: formData.message
    });
    
    // Save to database
    await enquiryRepository.save(enquiry);
    
    // Return a success response without sensitive data
    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry. We'll get back to you soon."
    }, { status: 201 });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later."
    }, { status: 500 });
  }
}
