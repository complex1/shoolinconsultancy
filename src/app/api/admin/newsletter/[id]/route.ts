import { NextRequest } from "next/server";
import { getRepository } from "../../../../../lib/sqlite";
import NewsletterEntity from "../../../../../entities/newsletter.entities";
import { 
  handleApiError,
  corsResponse,
  handleOptionsRequest 
} from "../../../../../lib/api-utils";

/**
 * GET - Fetch a single newsletter subscription by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get repository
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    
    // Find newsletter subscription by ID
    const subscription = await newsletterRepository.findOne({
      where: { id }
    });
    
    if (!subscription) {
      return corsResponse({
        success: false,
        message: `Subscription with ID ${id} not found`
      }, { status: 404 });
    }
    
    return corsResponse({
      success: true,
      data: subscription
    });
  } catch (error) {
    const { message, status } = handleApiError(error);
    return corsResponse({
      success: false,
      message
    }, { status });
  }
}

/**
 * PATCH - Update a newsletter subscription
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    
    // Get repository
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    
    // Find the subscription
    const subscription = await newsletterRepository.findOne({
      where: { id }
    });
    
    if (!subscription) {
      return corsResponse({
        success: false,
        message: `Subscription with ID ${id} not found`
      }, { status: 404 });
    }
    
    // Update fields if provided
    if (typeof updateData.isSubscribed === 'boolean') {
      subscription.isSubscribed = updateData.isSubscribed;
    }
    
    if (updateData.email && subscription.email !== updateData.email) {
      // Check if the new email already exists
      const existingEmail = await newsletterRepository.findOne({
        where: { email: updateData.email }
      });
      
      if (existingEmail) {
        return corsResponse({
          success: false,
          message: "This email is already registered"
        }, { status: 400 });
      }
      
      subscription.email = updateData.email;
    }
    
    // Save changes
    const updatedSubscription = await newsletterRepository.save(subscription);
    
    return corsResponse({
      success: true,
      data: updatedSubscription,
      message: "Subscription updated successfully"
    });
  } catch (error) {
    const { status } = handleApiError(error);
    return corsResponse({
      success: false,
      message: "Failed to update subscription"
    }, { status });
  }
}

/**
 * DELETE - Delete a newsletter subscription
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get repository
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    
    // Check if subscription exists
    const subscription = await newsletterRepository.findOne({
      where: { id }
    });
    
    if (!subscription) {
      return corsResponse({
        success: false,
        message: `Subscription with ID ${id} not found`
      }, { status: 404 });
    }
    
    // Delete subscription
    await newsletterRepository.delete(id);
    
    return corsResponse({
      success: true,
      message: "Subscription deleted successfully"
    });
  } catch (error) {
    const { status } = handleApiError(error);
    return corsResponse({
      success: false,
      message: "Failed to delete subscription"
    }, { status });
  }
}

/**
 * OPTIONS - Handle CORS preflight requests
 */
export function OPTIONS() {
  return handleOptionsRequest();
}
