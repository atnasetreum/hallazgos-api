import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { TrainingGuide } from './training-guide.entity';
import { Employee } from 'employees/entities';
import { TrainingGuideEmployeeEvaluation } from './training-guide-employee-evaluation.entity';

@Entity({ name: 'training_guide_topics' })
export class TrainingGuideTopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column()
  duration: number;

  @Column()
  typeOfEvaluation: string;

  @Column()
  order: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => TrainingGuide, (trainingGuide) => trainingGuide.topics)
  @JoinTable({
    name: 'training_guide_config_topics',
  })
  configs: TrainingGuide[];

  @ManyToMany(() => Employee, (employee) => employee.trainingGuideTopics)
  @JoinTable({
    name: 'training_guide_topic_responsibles',
  })
  responsibles: Employee[];

  @OneToMany(
    () => TrainingGuideEmployeeEvaluation,
    (trainingGuideEmployeeEvaluation) => trainingGuideEmployeeEvaluation.topic,
  )
  trainingGuideEmployeeEvaluations: TrainingGuideEmployeeEvaluation[];
}
