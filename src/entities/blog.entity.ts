/**
 * Blog Entity Definitions
 * Contains TypeORM entities for blog posts and related data structures
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entities';

@Entity()
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar', length: 255 })
  title: string | undefined;

  @Column({ type: 'text', nullable: true })
  excerpt: string | undefined;

  @Column({ type: 'text', nullable: true })
  content: string | undefined;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  createdAt: Date | undefined;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: Date | undefined;

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date | undefined;

  @Column({
    type: 'varchar',
    default: 'draft'
  })
  status!: 'draft' | 'published' | 'archived';

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity = new UserEntity;

  @Column('simple-array')
  tags: string[] = [];

  @Column({ type: 'int', default: 0 })
  readTime!: number;

  @Column({ type: 'varchar', length: 255 })
  coverImage!: string;

  @Column({ nullable: true })
  slug!: string;

  @Column({type: 'varchar', nullable: true })
  metaDescription: string | undefined;

  @Column({ type: 'int', default: 0 })
  viewCount: number | undefined;
}

// Optional helper functions for blog entities can be added here
export const formatPublishDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Hook this to the entity lifecycle or use in your service
export const prePersistBlogPost = (blogPost: BlogEntity): void => {
  if (!blogPost.slug) {
    blogPost.slug = generateSlug(blogPost.title ?? '');
  }
  
  if (!blogPost.readTime && blogPost.content) {
    blogPost.readTime = calculateReadTime(blogPost.content);
  }
};
