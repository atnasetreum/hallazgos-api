import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { TrainingGuideEmployeeEvaluation } from './training-guide-employee-evaluation.entity';
import { Employee, EmployeeArea, EmployeePosition } from 'employees/entities';
import { User } from 'users/entities/user.entity';

@Entity({ name: 'training_guide_employees' })
export class TrainingGuideEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => (value ? new Date(value) : null),
      to: (value: Date) => (value ? value.toISOString().slice(0, 10) : null),
    },
    name: 'start_date',
  })
  startDate: Date;

  @Column({ nullable: true, name: 'signature_employee' })
  signatureEmployee: string;

  @Column({ nullable: true, name: 'signature_area_manager' })
  signatureAreaManager: string;

  @Column({ nullable: true, name: 'signature_human_resource_manager' })
  signatureHumanResourceManager: string;

  @Column({ type: 'timestamptz', nullable: true })
  signatureEmployeeDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  signatureAreaManagerDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  signatureHumanResourceManagerDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Employee, (employee) => employee.trainingGuides)
  user: Employee;

  @ManyToOne(
    () => EmployeePosition,
    (employeePosition) => employeePosition.trainingGuideEmployees,
  )
  position: EmployeePosition;

  @ManyToOne(() => EmployeeArea, (area) => area.trainingGuideEmployees)
  area: EmployeeArea;

  @OneToMany(
    () => TrainingGuideEmployeeEvaluation,
    (trainingGuideEmployeeEvaluation) =>
      trainingGuideEmployeeEvaluation.trainingGuideEmployee,
  )
  evaluations: TrainingGuideEmployeeEvaluation[];

  @ManyToOne(() => User, (user) => user.areaTge)
  areaManager: User;

  @ManyToOne(() => User, (user) => user.humanResourceTge)
  humanResourceManager: User;
}
