import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { TypeOfInjury } from 'type-of-injuries/entities/type-of-injury.entity';
import { TypesOfEvent } from 'types-of-events/entities/types-of-event.entity';
import { CieDiagnosis } from 'cie-diagnoses/entities/cie-diagnosis.entity';
import { BodyPart } from 'body-parts/entities/body-part.entity';
import { AtAgent } from 'at-agents/entities/at-agent.entity';
import { User } from 'users/entities/user.entity';
import { Zone } from 'zones/entities/zone.entity';
import { Employee } from 'employees/entities';
import { AtMechanism } from 'at-mechanisms/entities/at-mechanism.entity';

@Entity({ name: 'ciael' })
export class Ciael {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => value ?? null,
      to: (value: Date) => (value ? value.toISOString().slice(0, 10) : null),
    },
  })
  eventDate: Date;

  @Column('int', {
    nullable: true,
  })
  daysOfDisability: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TypesOfEvent, (typesOfEvent) => typesOfEvent.ciaels)
  typeOfEvent: TypesOfEvent;

  @ManyToOne(() => User, (user) => user.ciaels)
  createdBy: User;

  @ManyToOne(() => Employee, (employee) => employee.ciaels)
  employee: Employee;

  @ManyToOne(() => CieDiagnosis, (cieDiagnosis) => cieDiagnosis.ciaels)
  cieDiagnosis: CieDiagnosis;

  @ManyToOne(() => Zone, (zone) => zone.ciaels)
  zone: Zone;

  @ManyToOne(() => BodyPart, (bodyPart) => bodyPart.ciaels)
  bodyPart: BodyPart;

  @ManyToOne(() => AtAgent, (atAgent) => atAgent.ciaels)
  atAgent: AtAgent;

  @ManyToOne(() => TypeOfInjury, (typeOfInjury) => typeOfInjury.ciaels)
  typeOfInjury: TypeOfInjury;

  @ManyToOne(() => AtMechanism, (atMechanism) => atMechanism.ciaels)
  atMechanism: AtMechanism;
}
