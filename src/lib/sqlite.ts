/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource, ObjectLiteral } from "typeorm";
import { BlogEntity } from "../entities/blog.entity";
import { UserEntity } from "../entities/user.entities";
import { TestimonialEntity } from "../entities/testimonials.entities";
import path from "path";
import ServiceEntity from "@/entities/services.entities";
import EnquiryEntity from "@/entities/enquiry.entities";
import AssetEntity from "@/entities/assets.entity";
import NewsletterEntity from "@/entities/newsletter.entities";
import { GalleryMediaEntity } from "@/entities/galleryMedia.entities";
import { ConsultationEntity } from "@/entities/consultation.entities";

// Configure the database connection
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(process.cwd(), "database.sqlite"),
  entities: [
    BlogEntity,
    UserEntity,
    TestimonialEntity,
    ServiceEntity,
    EnquiryEntity,
    AssetEntity,
    NewsletterEntity,
    GalleryMediaEntity,
    ConsultationEntity
  ], // Include all entities
  synchronize: true, // Be careful with this in production
  logging: process.env.NODE_ENV === "development",
});

// Initialize the database connection
export const initDB = async () => {
  const MAX_RETRIES = 3;
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      // Check if the connection is already initialized and connected
      if (AppDataSource.isInitialized) {
        return;
      }
      
      // Initialize the connection
      await AppDataSource.initialize();
      console.log("Data Source has been initialized successfully!");
      return;
    } catch (err) {
      retries++;
      console.error(`Error during Data Source initialization (attempt ${retries}/${MAX_RETRIES}):`, err);
      
      // If the connection is in a broken state, destroy it
      if (AppDataSource.isInitialized) {
        try {
          await AppDataSource.destroy();
          console.log("Destroyed broken connection");
        } catch (destroyError) {
          console.error("Failed to destroy connection:", destroyError);
        }
      }
      
      // If we've reached max retries, throw the error
      if (retries >= MAX_RETRIES) {
        console.error("Max retries reached. Could not initialize database connection.");
        throw err;
      }
      
      // Wait before retrying
      const delay = 500 * retries; // Exponential backoff
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Utility function to safely get a repository with connection verification
 * @param entityClass The entity class to get the repository for
 * @returns The repository for the specified entity
 */
export async function getRepository<T extends ObjectLiteral>(entityClass: any): Promise<import("typeorm").Repository<T>> {
  await initDB();
  
  if (!AppDataSource.isInitialized) {
    throw new Error("Database connection is not initialized");
  }
  
  const repository = AppDataSource.getRepository<T>(entityClass);
  
  // Try a simple query to verify connection
  try {
    // Just access the repository metadata to verify connection
    repository.metadata;
    return repository;
  } catch (error) {
    console.error("Repository verification failed:", error);
    
    // Try to reinitialize the connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    await initDB();
    return AppDataSource.getRepository<T>(entityClass);
  }
}
