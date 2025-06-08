import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Consultation Status Enum
 */
export enum ConsultationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RESCHEDULED = "RESCHEDULED"
}

/**
 * Consultation Entity
 * Represents consultation requests from users
 */
@Entity("consultations")
export class ConsultationEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * Client's full name
     */
    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    name: string;

    /**
     * Client's email address
     */
    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    email: string;

    /**
     * Client's phone number
     */
    @Column({
        type: "varchar",
        length: 20,
        nullable: false
    })
    phone: string;

    /**
     * Consultation message/details
     */
    @Column({
        type: "text",
        nullable: false
    })
    message: string;

    /**
     * Whether client agreed to terms and conditions
     */
    @Column({
        type: "boolean",
        default: true
    })
    agreeToTerms: boolean;

    /**
     * Selected date for consultation
     */
    @Column({
        type: "datetime",
        nullable: false
    })
    selectedDate: Date;

    /**
     * Selected time for consultation (stored as string e.g. "9:00 AM")
     */
    @Column({
        type: "varchar",
        length: 20,
        nullable: false
    })
    selectedTime: string;

    /**
     * Requested attorney/consultant
     */
    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    attorney: string;

    /**
     * Status of the consultation request
     */
    @Column({
        type: "varchar",
        length: 20,
        enum: ConsultationStatus,
        default: ConsultationStatus.PENDING
    })
    status: ConsultationStatus;

    /**
     * Admin notes (optional)
     */
    @Column({
        type: "text",
        nullable: true
    })
    adminNotes?: string;

    /**
     * Creation timestamp
     */
    @CreateDateColumn()
    createdAt: Date;

    /**
     * Last update timestamp
     */
    @UpdateDateColumn()
    updatedAt: Date;
}