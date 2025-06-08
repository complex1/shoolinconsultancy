import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Gallery Media Entity
 * Represents images and videos used in the gallery section of the website
 */
@Entity("gallery_media")
export class GalleryMediaEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * Type of media (image or video)
     */
    @Column({
        type: "varchar",
        length: 10,
        nullable: false
    })
    type: "image" | "video";

    /**
     * Source URL for the media file
     */
    @Column({
        type: "varchar",
        length: 2000,
        nullable: false
    })
    src: string;

    /**
     * Alternative text for the media
     */
    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    alt: string;

    /**
     * Caption for the media
     */
    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    caption: string;

    /**
     * Poster image URL for videos (optional)
     */
    @Column({
        type: "varchar",
        length: 2000,
        nullable: true
    })
    poster?: string;

    /**
     * Determines if the media is published/active
     */
    @Column({
        type: "boolean",
        default: true
    })
    isActive: boolean;

    /**
     * Display order for the media
     */
    @Column({
        type: "int",
        default: 0
    })
    displayOrder: number;

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