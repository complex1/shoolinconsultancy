import { NextRequest } from "next/server";
import { getRepository } from "../../../../../lib/sqlite";
import NewsletterEntity from "../../../../../entities/newsletter.entities";
import { 
  handleApiError,
  corsResponse,
  handleOptionsRequest 
} from "../../../../../lib/api-utils";

/**
 * POST - Unsubscribe from the newsletter
 * Required fields: email
 */
export async function POST(request: NextRequest) {
  try {
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    const { email } = await request.json();
    
    // Validate required fields
    if (!email) {
      return corsResponse({
        success: false,
        message: "Email is required"
      }, { status: 400 });
    }
    
    // Find the subscription
    const subscription = await newsletterRepository.findOne({
      where: { email }
    });
    
    if (!subscription) {
      return corsResponse({
        success: false,
        message: "No subscription found for this email address"
      }, { status: 404 });
    }
    
    // If already unsubscribed
    if (!subscription.isSubscribed) {
      return corsResponse({
        success: true,
        message: "You are already unsubscribed from our newsletter"
      });
    }
    
    // Update the subscription
    subscription.isSubscribed = false;
    await newsletterRepository.save(subscription);
    
    return corsResponse({
      success: true,
      message: "You have been successfully unsubscribed from our newsletter"
    });
  } catch (error) {
    const { status } = handleApiError(error);
    
    return corsResponse({
      success: false,
      message: "Failed to unsubscribe from newsletter"
    }, { status });
  }
}

/**
 * OPTIONS - Handle CORS preflight requests
 */
export function OPTIONS() {
  return handleOptionsRequest();
}
