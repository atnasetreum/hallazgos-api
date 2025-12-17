import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { TrainingGuideEmployee } from './training-guide-employee.entity';
import { TrainingGuideTopic } from './training-guide-topic.entity';

@Entity({ name: 'training_guide_employee_evaluations' })
export class TrainingGuideEmployeeEvaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => (value ? new Date(value) : null),
      to: (value: Date) => (value ? value.toISOString().slice(0, 10) : null),
    },
    nullable: true,
  })
  evaluationDate: Date;

  @Column({ nullable: true })
  evaluationValue: string;

  @Column('text', { nullable: true })
  observations: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => TrainingGuideEmployee,
    (trainingGuideEmployee) => trainingGuideEmployee.evaluations,
  )
  trainingGuideEmployee: TrainingGuideEmployee;

  @ManyToOne(
    () => TrainingGuideTopic,
    (trainingGuideTopic) => trainingGuideTopic.trainingGuideEmployeeEvaluations,
  )
  topic: TrainingGuideTopic;
}
