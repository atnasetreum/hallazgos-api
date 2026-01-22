import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Topic } from 'topics/entities/topic.entity';
import { ConfigsTg } from './configs-tg.entity';
import { Employee } from 'employees/entities';

@Entity()
export class ConfigsTopicTg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @ManyToOne(() => Topic, (topic) => topic.configs)
  topic: Topic;

  @ManyToMany(() => Employee, (employee) => employee.configsTopicTg)
  @JoinTable({
    name: 'configs_topic_tg_responsibles',
  })
  responsibles: Employee[];

  @ManyToOne(() => ConfigsTg, (configsTg) => configsTg.topics)
  configTg: ConfigsTg;
}
