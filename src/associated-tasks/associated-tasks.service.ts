import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateAssociatedTaskDto, UpdateAssociatedTaskDto } from './dto';
import { AssociatedTask } from './entities/associated-task.entity';

@Injectable()
export class AssociatedTasksService {
  constructor(
    @InjectRepository(AssociatedTask)
    private readonly associatedTaskRepository: Repository<AssociatedTask>,
  ) {}

  create(createAssociatedTaskDto: CreateAssociatedTaskDto) {
    return this.associatedTaskRepository.create(createAssociatedTaskDto);
  }

  findAll() {
    return `This action returns all associatedTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} associatedTask`;
  }

  update(id: number, updateAssociatedTaskDto: UpdateAssociatedTaskDto) {
    return { id, updateAssociatedTaskDto };
  }

  remove(id: number) {
    return `This action removes a #${id} associatedTask`;
  }
}
