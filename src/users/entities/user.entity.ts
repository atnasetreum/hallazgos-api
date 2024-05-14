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
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => ManufacturingPlant)
  @JoinTable({
    name: 'user_manufacturing_plants',
  })
  manufacturingPlants: ManufacturingPlant[];

  @ManyToMany(() => Zone)
  @JoinTable({
    name: 'user_zones',
  })
  zones: Zone[];

  @OneToMany(() => Evidence, (evidence) => evidence.user)
  evidences: Evidence[];

  @OneToMany(() => Comment, (evidence) => evidence.user)
  comments: Comment[];

  /*@ManyToOne(() => Evidence, (evidence) => evidence.supervisors)
  assignedEvidence: Evidence;*/

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
