import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Asset Entity
 * Represents media assets used throughout the application
 */
@Entity('assets')
export class AssetEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 512 })
  url!: string;

  @Column({ type: 'boolean', default: false })
  isSvg!: boolean;

  @Column({ type: 'text', nullable: true })
  svgCode?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  type?: string;

  @Column({ type: 'int', nullable: true })
  size?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}

/**
 * Helper function to create a new asset entity
 */
export const createAsset = (data: {
  name: string;
  url: string;
  isSvg?: boolean;
  svgCode?: string;
  type?: string;
  size?: number;
  alt?: string;
}): AssetEntity => {
  const asset = new AssetEntity();
  
  asset.name = data.name;
  asset.url = data.url;
  asset.isSvg = data.isSvg || false;
  asset.svgCode = data.svgCode;
  asset.type = data.type;
  asset.size = data.size;
  asset.alt = data.alt;
  
  return asset;
};

export default AssetEntity;
