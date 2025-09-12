import { Injectable } from '@nestjs/common';

import { CreateWorkingDayDto, UpdateWorkingDayDto } from './dto';

@Injectable()
export class WorkingDaysService {
  create(createWorkingDayDto: CreateWorkingDayDto) {
    return createWorkingDayDto;
  }

  findAll() {
    return `This action returns all workingDays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workingDay`;
  }

  update(id: number, updateWorkingDayDto: UpdateWorkingDayDto) {
    return { id, updateWorkingDayDto };
  }

  remove(id: number) {
    return `This action removes a #${id} workingDay`;
  }
}
