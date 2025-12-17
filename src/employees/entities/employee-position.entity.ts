import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { TrainingGuide } from 'training-guides/entities/training-guide.entity';
import { TrainingGuideEmployee } from 'training-guides/entities';
import { Employee } from './employee.entity';

@Entity()
export class EmployeePosition {
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

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];

  @OneToMany(() => TrainingGuide, (trainingGuide) => trainingGuide.position)
  trainingGuides: TrainingGuide[];

  @OneToMany(
    () => TrainingGuideEmployee,
    (trainingGuideEmployee) => trainingGuideEmployee.position,
  )
  trainingGuideEmployees: TrainingGuideEmployee[];
}
