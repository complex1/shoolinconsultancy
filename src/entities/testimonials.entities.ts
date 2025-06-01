import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Testimonial Entity
 * Represents client testimonials and reviews
 */
@Entity('testimonials')
export class TestimonialEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  position!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'text' })
  text!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  platform?: string;

  @Column({ type: 'integer', default: 5 })
  rating!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  iconColor?: string;

  @Column({ type: 'varchar', length: 100 })
  category!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'integer', default: 0 })
  displayOrder!: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}

/**
 * Helper factory function to create a new testimonial entity
 */
export const createTestimonial = (data: {
  name: string;
  position: string;
  text: string;
  category: string;
  avatar?: string;
  platform?: string;
  rating?: number;
  icon?: string;
  iconColor?: string;
  isActive?: boolean;
  displayOrder?: number;
}): TestimonialEntity => {
  const testimonial = new TestimonialEntity();
  
  testimonial.name = data.name;
  testimonial.position = data.position;
  testimonial.text = data.text;
  testimonial.category = data.category;
  testimonial.avatar = data.avatar;
  testimonial.platform = data.platform;
  testimonial.rating = data.rating ?? 5;
  testimonial.icon = data.icon;
  testimonial.iconColor = data.iconColor;
  testimonial.isActive = data.isActive ?? true;
  testimonial.displayOrder = data.displayOrder ?? 0;
  
  return testimonial;
};

/**
 * Helper function to get formatted testimonials by category
 */
export const getTestimonialsByCategory = (
  testimonials: TestimonialEntity[],
  category?: string
): TestimonialEntity[] => {
  let filteredTestimonials = [...testimonials];
  
  // Filter by category if provided
  if (category) {
    filteredTestimonials = filteredTestimonials.filter(
      testimonial => testimonial.category === category
    );
  }
  
  // Return only active testimonials sorted by display order
  return filteredTestimonials
    .filter(testimonial => testimonial.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

export default TestimonialEntity;
