import { DataSource } from "typeorm";
import { BlogEntity } from "../entities/blog.entity";
import { UserEntity } from "../entities/user.entities";
import { TestimonialEntity } from "../entities/testimonials.entities";
import path from "path";

// Configure the database connection
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(process.cwd(), "database.sqlite"),
  entities: [BlogEntity, UserEntity, TestimonialEntity], // Explicitly include TestimonialEntity
  synchronize: true, // Be careful with this in production
  logging: process.env.NODE_ENV === "development",
});

let initialized = false;

export const initDB = async () => {
  if (initialized) return;
  
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    }
    initialized = true;
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    throw err;
  }
};
