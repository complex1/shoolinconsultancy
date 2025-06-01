import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Enquiry Entity
 * Represents client enquiries and contact form submissions
 */
@Entity('enquiries')
export class EnquiryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'varchar', length: 100 })
  service!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status!: string;

  @Column({ type: 'boolean', default: false })
  isResolved!: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}

/**
 * Helper function to create a new enquiry entity
 */
export const createEnquiry = (data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): EnquiryEntity => {
  const enquiry = new EnquiryEntity();
  
  enquiry.name = data.name;
  enquiry.email = data.email;
  enquiry.phone = data.phone;
  enquiry.service = data.service;
  enquiry.message = data.message;
  
  return enquiry;
};

export default EnquiryEntity;
