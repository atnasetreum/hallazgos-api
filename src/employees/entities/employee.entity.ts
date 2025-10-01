import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { EmployeePosition } from './employee-position.entity';
import { EmployeeArea } from './employee-area.entity';
import { Ciael } from 'ciaels/entities/ciael.entity';
import { Genre } from 'genres/entities/genre.entity';
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

  @Column({
    nullable: true,
    type: 'date',
    transformer: {
      from: (value: string) => value ?? null,
      to: (value: Date) => (value ? value.toISOString().slice(0, 10) : null),
    },
  })
  birthdate: Date;

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

  @ManyToMany(
    () => ManufacturingPlant,
    (manufacturingPlant) => manufacturingPlant.employees,
  )
  manufacturingPlants: ManufacturingPlant[];

  @OneToMany(() => Ciael, (ciael) => ciael.employee)
  ciaels: Ciael[];

  @ManyToOne(() => Genre, (genre) => genre.employees)
  gender: Genre;
}
