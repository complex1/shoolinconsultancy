import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Newsletter Entity
 * Represents newsletter subscribers
 */
@Entity('newsletter')
export class NewsletterEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @CreateDateColumn({ type: 'datetime' })
  joinedAt!: Date;

  @Column({ type: 'boolean', default: true })
  isSubscribed!: boolean;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}

/**
 * Helper function to create a new newsletter subscription
 */
export const createNewsletterSubscription = (data: {
  email: string;
}): NewsletterEntity => {
  const subscription = new NewsletterEntity();
  subscription.email = data.email;
  subscription.isSubscribed = true;
  
  return subscription;
};

export default NewsletterEntity;