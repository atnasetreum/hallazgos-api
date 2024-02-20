import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { MainType } from 'main-types/entities/main-type.entity';
import { Evidence } from 'evidences/entities/evidence.entity';

@Entity()
export class SecondaryType {
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

  @ManyToOne(() => MainType, (mainType) => mainType.secondaryTypes)
  mainType: MainType;

  @OneToMany(() => Evidence, (evidence) => evidence.secondaryType)
  evidences: Evidence[];
}
