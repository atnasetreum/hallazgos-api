import { Injectable } from '@nestjs/common';

import { CreateAssociatedTaskDto, UpdateAssociatedTaskDto } from './dto';

@Injectable()
export class AssociatedTasksService {
  create(createAssociatedTaskDto: CreateAssociatedTaskDto) {
    return createAssociatedTaskDto;
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
