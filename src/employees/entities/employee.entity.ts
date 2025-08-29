import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { EmployeePosition } from './employee-position.entity';
import { EmployeeArea } from './employee-area.entity';
import { Epp } from 'epps/entities/epp.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  code: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => EmployeeArea, (area) => area.employees)
  area: EmployeeArea;

  @ManyToOne(() => EmployeePosition, (position) => position.employees)
  position: EmployeePosition;

  @OneToMany(() => Epp, (epp) => epp.employee)
  epps: Epp[];
}
