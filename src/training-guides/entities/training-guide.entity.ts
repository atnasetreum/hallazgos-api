import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import { EmployeePosition } from 'employees/entities';
import { TrainingGuideTopic } from './training-guide-topic.entity';
import { User } from 'users/entities/user.entity';

@Entity({ name: 'training_guides' })
export class TrainingGuide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => EmployeePosition,
    (employeePosition) => employeePosition.trainingGuides,
  )
  @JoinColumn({ name: 'employee_position_id' })
  position: EmployeePosition;

  @ManyToMany(
    () => TrainingGuideTopic,
    (trainingGuideTopic) => trainingGuideTopic.configs,
  )
  topics: TrainingGuideTopic[];

  @ManyToOne(() => User, (user) => user.areaTg)
  areaManager: User;

  @ManyToOne(() => User, (user) => user.humanResourceTg)
  humanResourceManager: User;
}
