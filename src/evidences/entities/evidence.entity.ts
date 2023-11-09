import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { MainType } from 'main-types/entities/main-type.entity';
import { SecondaryType } from 'secondary-types/entities/secondary-type.entity';
import { Zone } from 'zones/entities/zone.entity';
import { User } from 'users/entities/user.entity';

@Entity()
export class Evidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgEvidence: string;

  @Column()
  imgSignature: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => ManufacturingPlant,
    (manufacturingPlant) => manufacturingPlant.evidences,
  )
  manufacturingPlant: ManufacturingPlant;

  @ManyToOne(() => MainType, (mainType) => mainType.evidences)
  mainType: MainType;

  @ManyToOne(() => SecondaryType, (secondaryType) => secondaryType.evidences)
  secondaryType: SecondaryType;

  @ManyToOne(() => Zone, (zone) => zone.evidences)
  zone: Zone;

  @ManyToOne(() => User, (user) => user.evidences)
  user: User;
}
