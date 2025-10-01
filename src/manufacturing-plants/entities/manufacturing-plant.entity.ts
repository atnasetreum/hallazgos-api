import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Processes } from 'processes/entities/processes.entity';
import { Evidence } from 'evidences/entities/evidence.entity';
import { Country } from 'countries/entities/country.entity';
import { Zone } from 'zones/entities/zone.entity';
import { Employee } from 'employees/entities';
@Entity()
@ObjectType()
export class ManufacturingPlant {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  link: string;

  @Column('decimal', { unique: true })
  @Field(() => Number)
  lat: number;

  @Column('decimal', { unique: true })
  @Field(() => Number)
  lng: number;

  @Column({ default: true })
  @Field(() => Boolean, {
    defaultValue: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => Evidence, (evidence) => evidence.manufacturingPlant)
  @Field(() => [Evidence])
  evidences: Evidence[];

  @OneToMany(() => Zone, (zone) => zone.manufacturingPlant)
  @Field(() => [Zone])
  zones: Zone[];

  @OneToMany(() => Processes, (processes) => processes.manufacturingPlant)
  @Field(() => [Processes])
  processes: Processes[];

  @ManyToOne(() => Country, (country) => country.manufacturingPlants)
  country: Country;

  @ManyToMany(() => Employee, (employee) => employee.manufacturingPlants)
  @JoinTable({
    name: 'employees_manufacturing_plants',
  })
  employees: Employee[];
}
