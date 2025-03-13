import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import * as argon2 from 'argon2';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { Zone } from 'zones/entities/zone.entity';
import { Evidence } from 'evidences/entities/evidence.entity';
import { Comment } from 'evidences/entities/comments.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ select: false })
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  role: string;

  @Column('text', { nullable: true, default: '' })
  @Field(() => String, { nullable: true, defaultValue: '' })
  typeResponsible: string;

  @Column({ default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToMany(() => ManufacturingPlant)
  @JoinTable({
    name: 'user_manufacturing_plants',
  })
  @Field(() => [ManufacturingPlant])
  manufacturingPlants: ManufacturingPlant[];

  @ManyToMany(() => Zone)
  @JoinTable({
    name: 'user_zones',
  })
  @Field(() => [Zone])
  zones: Zone[];

  @OneToMany(() => Evidence, (evidence) => evidence.user)
  @Field(() => [Evidence])
  evidences: Evidence[];

  @OneToMany(() => Comment, (evidence) => evidence.user)
  @Field(() => [Comment])
  comments: Comment[];

  @ManyToMany(() => ManufacturingPlant)
  @JoinTable({
    name: 'user_manufacturing_plants_maintenance_security',
  })
  @Field(() => [ManufacturingPlant])
  manufacturingPlantNamesMaintenanceSecurity: ManufacturingPlant[];

  @ManyToMany(() => Zone)
  @JoinTable({
    name: 'user_zones_maintenance_security',
  })
  @Field(() => [Zone])
  zonesMaintenanceSecurity: Zone[];

  /*@ManyToOne(() => Evidence, (evidence) => evidence.supervisors)
  assignedEvidence: Evidence;*/

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
