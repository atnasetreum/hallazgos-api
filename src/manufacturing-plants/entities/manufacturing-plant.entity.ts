import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Evidence } from 'evidences/entities/evidence.entity';
import { Zone } from 'zones/entities/zone.entity';
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
}
