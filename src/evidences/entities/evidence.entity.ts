import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { MainType } from 'main-types/entities/main-type.entity';
import { SecondaryType } from 'secondary-types/entities/secondary-type.entity';
import { Zone } from 'zones/entities/zone.entity';
import { User } from 'users/entities/user.entity';
import { Comment } from './comments.entity';
import { TypeManage } from 'type-manages/entities/type-manage.entity';

@Entity()
@ObjectType()
export class Evidence {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  imgEvidence: string;

  @Column({ default: '' })
  @Field(() => String, {
    defaultValue: '',
  })
  imgSolution: string;

  @Column({ default: null })
  @Field(() => Date, {
    defaultValue: null,
    nullable: true,
  })
  solutionDate: Date;

  @Column()
  @Field(() => String)
  status: string;

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

  @ManyToOne(
    () => ManufacturingPlant,
    (manufacturingPlant) => manufacturingPlant.evidences,
  )
  @Field(() => ManufacturingPlant)
  manufacturingPlant: ManufacturingPlant;

  @ManyToOne(() => MainType, (mainType) => mainType.evidences)
  @Field(() => MainType)
  mainType: MainType;

  @ManyToOne(() => SecondaryType, (secondaryType) => secondaryType.evidences)
  @Field(() => SecondaryType)
  secondaryType: SecondaryType;

  @ManyToOne(() => Zone, (zone) => zone.evidences)
  @Field(() => Zone)
  zone: Zone;

  @ManyToOne(() => TypeManage, (typeManage) => typeManage.evidences)
  @Field(() => TypeManage, {
    nullable: true,
  })
  typeManage?: TypeManage;

  @ManyToOne(() => User, (user) => user.evidences)
  @Field(() => User)
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  @Field(() => [User])
  supervisors: User[];

  @OneToMany(() => Comment, (comment) => comment.evidence)
  @Field(() => [Comment])
  comments: Comment[];
}
