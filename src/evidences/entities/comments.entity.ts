import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Evidence } from './evidence.entity';
import { User } from 'users/entities/user.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: null })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: null })
  updatedAt: Date;

  @ManyToOne(() => Evidence, (evidence) => evidence.comments)
  evidence: Evidence;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
  })
  user: User;
}
