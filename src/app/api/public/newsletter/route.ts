import { NextRequest } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import NewsletterEntity, { createNewsletterSubscription } from "../../../../entities/newsletter.entities";
import { 
  getPaginationParams, 
  getFilterParams, 
  getPaginatedResults, 
  handleApiError,
  corsResponse,
  handleOptionsRequest 
} from "../../../../lib/api-utils";

/**
 * GET - Public endpoint to fetch newsletter subscribers with pagination and filtering
 * Supports filters: isSubscribed
 * Example: /api/public/newsletter?page=1&limit=10&isSubscribed=true
 * Note: This endpoint should be protected in a real-world scenario
 */
export async function GET(request: NextRequest) {
  try {
    // Get repository
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    
    // Get pagination parameters
    const paginationParams = getPaginationParams(request);
    
    // Get filter parameters (fields that are allowed to be filtered)
    const filters = getFilterParams(request, ['isSubscribed']);
    
    // Set default order - newest subscribers first
    const orderBy = { joinedAt: 'DESC' as const };
    
    // Get paginated results
    const result = await getPaginatedResults(newsletterRepository, paginationParams, filters, orderBy);
    
    return corsResponse({
      success: true,
      ...result
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
 * POST - Create a new newsletter subscription
 * Required fields: email
 */
export async function POST(request: NextRequest) {
  try {
    const newsletterRepository = await getRepository<NewsletterEntity>(NewsletterEntity);
    const subscriptionData = await request.json();
    
    // Validate required fields
    if (!subscriptionData.email) {
      return corsResponse({
        success: false,
        message: "Email is required"
      }, { status: 400 });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriptionData.email)) {
      return corsResponse({
        success: false,
        message: "Please provide a valid email address"
      }, { status: 400 });
    }
    
    // Check if email already exists
    const existingSubscription = await newsletterRepository.findOne({
      where: { email: subscriptionData.email }
    });
    
    // If email exists and is already subscribed
    if (existingSubscription && existingSubscription.isSubscribed) {
      return corsResponse({
        success: false,
        message: "This email is already subscribed to the newsletter"
      }, { status: 400 });
    }
    
    // If email exists but was unsubscribed, reactivate it
    if (existingSubscription && !existingSubscription.isSubscribed) {
      existingSubscription.isSubscribed = true;
      await newsletterRepository.save(existingSubscription);
      
      return corsResponse({
        success: true,
        message: "Your subscription has been reactivated",
        data: existingSubscription
      }, { status: 200 });
    }
    
    // Create new subscription
    const newSubscription = createNewsletterSubscription({
      email: subscriptionData.email
    });
    
    // Save to database
    const savedSubscription = await newsletterRepository.save(newSubscription);
    
    return corsResponse({
      success: true,
      message: "You have been successfully subscribed to our newsletter",
      data: savedSubscription
    }, { status: 201 });
  } catch (error) {
    const { message, status } = handleApiError(error);
    
    // Handle duplicate email error specifically
    if (message.includes('UNIQUE constraint failed')) {
      return corsResponse({
        success: false,
        message: "This email is already subscribed to the newsletter"
      }, { status: 400 });
    }
    
    return corsResponse({
      success: false,
      message: "Failed to subscribe to newsletter"
    }, { status });
  }
}

/**
 * OPTIONS - Handle CORS preflight requests
 */
export function OPTIONS() {
  return handleOptionsRequest();
}
