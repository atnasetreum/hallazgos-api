import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { EquipmentCostHistory } from './equipment-cost-history.entity';
import { EppEquipment } from 'epps/entities';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EquipmentCostHistory, (costHistory) => costHistory.equipment)
  costHistory: EquipmentCostHistory[];

  @OneToMany(() => EppEquipment, (eppEquipment) => eppEquipment.equipment)
  eppEquipments: EppEquipment[];
}
