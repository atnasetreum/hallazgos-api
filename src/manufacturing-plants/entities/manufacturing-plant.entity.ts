import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Evidence } from 'evidences/entities/evidence.entity';
import { Zone } from 'zones/entities/zone.entity';
@Entity()
export class ManufacturingPlant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  link: string;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Evidence, (evidence) => evidence.manufacturingPlant)
  evidences: Evidence[];

  @OneToMany(() => Zone, (zone) => zone.manufacturingPlant)
  zones: Zone[];
}
