/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "../../../../lib/sqlite";
import { BlogEntity } from "../../../../entities/blog.entity";
import { ServiceEntity } from "../../../../entities/services.entities";
import { TestimonialEntity } from "../../../../entities/testimonials.entities";
import { EnquiryEntity } from "../../../../entities/enquiry.entities";
import { AssetEntity } from "../../../../entities/assets.entity";
import { UserEntity } from "../../../../entities/user.entities";

// Helper function to get latest items from any entity
async function getLatestItems<T>(repository: any, count: number = 5): Promise<T[]> {
  return repository.find({
    order: {
      createdAt: "DESC",
    },
    take: count,
  });
}

// Helper function to count items with optional filters
async function countItems(repository: any, filter?: object): Promise<number> {
  return repository.count(filter ? { where: filter } : {});
}

// GET - Fetch dashboard overview data
export async function GET(request: NextRequest) {
  try {
    console.log("GET /api/admin/dashboard - Initializing database connections");
    
    // Get repositories using the improved connection handling
    const blogRepository = await getRepository<BlogEntity>(BlogEntity);
    const serviceRepository = await getRepository<ServiceEntity>(ServiceEntity);
    const testimonialRepository = await getRepository<TestimonialEntity>(TestimonialEntity);
    const enquiryRepository = await getRepository<EnquiryEntity>(EnquiryEntity);
    const assetRepository = await getRepository<AssetEntity>(AssetEntity);
    const userRepository = await getRepository<UserEntity>(UserEntity);

    // Get counts of all entities
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalServices,
      activeServices,
      featuredServices,
      totalTestimonials,
      activeTestimonials,
      totalEnquiries,
      pendingEnquiries,
      resolvedEnquiries,
      totalAssets,
      svgAssets,
      totalUsers
    ] = await Promise.all([
      // Blog counts
      countItems(blogRepository),
      countItems(blogRepository, { status: 'published' }),
      countItems(blogRepository, { status: 'draft' }),
      
      // Service counts
      countItems(serviceRepository),
      countItems(serviceRepository, { isActive: true }),
      countItems(serviceRepository, { featured: true }),
      
      // Testimonial counts
      countItems(testimonialRepository),
      countItems(testimonialRepository, { isActive: true }),
      
      // Enquiry counts
      countItems(enquiryRepository),
      countItems(enquiryRepository, { status: 'pending' }),
      countItems(enquiryRepository, { isResolved: true }),
      
      // Asset counts
      countItems(assetRepository),
      countItems(assetRepository, { isSvg: true }),
      
      // User counts
      countItems(userRepository),
    ]);
    
    // Get latest items for each entity (limited to 5 each)
    const [
      latestBlogs,
      latestServices,
      latestTestimonials,
      latestEnquiries,
      latestAssets,
    ] = await Promise.all([
      getLatestItems<BlogEntity>(blogRepository),
      getLatestItems<ServiceEntity>(serviceRepository),
      getLatestItems<TestimonialEntity>(testimonialRepository),
      getLatestItems<EnquiryEntity>(enquiryRepository),
      getLatestItems<AssetEntity>(assetRepository),
    ]);
    
    // Calculate additional metrics
    const enquiriesResponseRate = totalEnquiries > 0 
      ? (resolvedEnquiries / totalEnquiries) * 100 
      : 0;
    
    // Format metrics into structure for dashboard
    const dashboardData = {
      counts: {
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          drafts: draftBlogs,
        },
        services: {
          total: totalServices,
          active: activeServices,
          featured: featuredServices,
        },
        testimonials: {
          total: totalTestimonials,
          active: activeTestimonials,
        },
        enquiries: {
          total: totalEnquiries,
          pending: pendingEnquiries,
          resolved: resolvedEnquiries,
          responseRate: Math.round(enquiriesResponseRate),
        },
        assets: {
          total: totalAssets,
          svg: svgAssets,
          images: totalAssets - svgAssets,
        },
        users: {
          total: totalUsers,
        },
      },
      latest: {
        blogs: latestBlogs,
        services: latestServices,
        testimonials: latestTestimonials,
        enquiries: latestEnquiries,
        assets: latestAssets,
      },
      // Add system info for monitoring
      system: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      }
    };
    
    return NextResponse.json({
      success: true,
      data: dashboardData
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
