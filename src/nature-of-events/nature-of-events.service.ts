import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateNatureOfEventDto, UpdateNatureOfEventDto } from './dto';
import { NatureOfEvent } from './entities/nature-of-event.entity';

@Injectable()
export class NatureOfEventsService {
  constructor(
    @InjectRepository(NatureOfEvent)
    private readonly natureOfEventRepository: Repository<NatureOfEvent>,
  ) {}

  seed() {
    const data = ['Acto inseguro', 'Condición insegura'];

    data.forEach(async (name) => {
      const natureOfEvent = this.natureOfEventRepository.create({ name });
      await this.natureOfEventRepository.save(natureOfEvent);
    });

    return 'Seeding nature of events...';
  }

  create(createNatureOfEventDto: CreateNatureOfEventDto) {
    return createNatureOfEventDto;
  }

  findAll() {
    return `This action returns all natureOfEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} natureOfEvent`;
  }

  update(id: number, updateNatureOfEventDto: UpdateNatureOfEventDto) {
    return { id, updateNatureOfEventDto };
  }

  remove(id: number) {
    return `This action removes a #${id} natureOfEvent`;
  }
}
