import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Evidence } from 'evidences/entities/evidence.entity';
import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';

@Entity({ name: 'zones' })
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Evidence, (evidence) => evidence.zone)
  evidences: Evidence[];

  @ManyToOne(
    () => ManufacturingPlant,
    (manufacturingPlant) => manufacturingPlant.zones,
  )
  manufacturingPlant: ManufacturingPlant;
}
