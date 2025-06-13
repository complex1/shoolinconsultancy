/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource, initDB } from "../../../../../lib/sqlite";
import { EnquiryEntity } from "../../../../../entities/enquiry.entities";

// Helper function to ensure DB is initialized
async function ensureDbInitialized() {
  await initDB();
  return AppDataSource.getRepository(EnquiryEntity);
}

// GET - Fetch a single enquiry by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const enquiryRepository = await ensureDbInitialized();
    const id = parseInt((await params).id);
    
    // Validate ID
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid enquiry ID"
      }, { status: 400 });
    }
    
    // Find the enquiry
    const enquiry = await enquiryRepository.findOne({
      where: { id }
    });
    
    if (!enquiry) {
      return NextResponse.json({
        success: false,
        message: "Enquiry not found"
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: enquiry
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching enquiry:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch enquiry"
    }, { status: 500 });
  }
}

// PATCH - Update enquiry status or resolution
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const enquiryRepository = await ensureDbInitialized();
    const id = parseInt((await params).id);
    const updates = await request.json();
    
    // Validate ID
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid enquiry ID"
      }, { status: 400 });
    }
    
    // Find the enquiry
    const enquiry = await enquiryRepository.findOne({
      where: { id }
    });
    
    if (!enquiry) {
      return NextResponse.json({
        success: false,
        message: "Enquiry not found"
      }, { status: 404 });
    }
    
    // Update only allowed fields (prevent overwriting user submitted data)
    const allowedUpdates = ['status', 'isResolved'];
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        (enquiry as any)[key] = updates[key];
      }
    });
    
    // Save updates
    const updatedEnquiry = await enquiryRepository.save(enquiry);
    
    return NextResponse.json({
      success: true,
      data: updatedEnquiry
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update enquiry"
    }, { status: 500 });
  }
}

// DELETE - Delete an enquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = parseInt((await params).id);
  try {
    const enquiryRepository = await ensureDbInitialized();
    
    // Validate ID
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid enquiry ID"
      }, { status: 400 });
    }
    
    // Find the enquiry
    const enquiry = await enquiryRepository.findOne({
      where: { id }
    });
    
    if (!enquiry) {
      return NextResponse.json({
        success: false,
        message: "Enquiry not found"
      }, { status: 404 });
    }
    
    // Delete the enquiry
    await enquiryRepository.remove(enquiry);
    
    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete enquiry"
    }, { status: 500 });
  }
}
