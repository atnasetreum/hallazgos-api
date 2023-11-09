import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { SecondaryType } from 'secondary-types/entities/secondary-type.entity';
import { Evidence } from 'evidences/entities/evidence.entity';

@Entity()
export class MainType {
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

  @OneToMany(() => SecondaryType, (secondaryType) => secondaryType.mainType)
  secondaryTypes: SecondaryType[];

  @OneToMany(() => Evidence, (evidence) => evidence.mainType)
  evidences: Evidence[];
}
