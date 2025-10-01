import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateWorkingDayDto, UpdateWorkingDayDto } from './dto';
import { WorkingDay } from './entities/working-day.entity';

@Injectable()
export class WorkingDaysService {
  constructor(
    @InjectRepository(WorkingDay)
    private readonly workingDayRepository: Repository<WorkingDay>,
  ) {}

  seed() {
    const data = ['Diurna', 'Nocturna', 'Mixta'];

    data.forEach(async (name) => {
      const event = this.workingDayRepository.create({ name });
      await this.workingDayRepository.save(event);
    });

    return 'Seeding working days...';
  }

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
