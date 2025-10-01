import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateTypesOfEventDto, UpdateTypesOfEventDto } from './dto';
import { TypesOfEvent } from './entities/types-of-event.entity';

@Injectable()
export class TypesOfEventsService {
  constructor(
    @InjectRepository(TypesOfEvent)
    private readonly typesOfEventRepository: Repository<TypesOfEvent>,
  ) {}

  seed() {
    const data = ['Accidente de trabajo', 'Incidente de trabajo'];

    data.forEach(async (name) => {
      const event = this.typesOfEventRepository.create({ name });
      await this.typesOfEventRepository.save(event);
    });

    return 'Seeding types of events...';
  }

  create(createTypesOfEventDto: CreateTypesOfEventDto) {
    return createTypesOfEventDto;
  }

  findAll() {
    return this.typesOfEventRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} typesOfEvent`;
  }

  update(id: number, updateTypesOfEventDto: UpdateTypesOfEventDto) {
    return { id, updateTypesOfEventDto };
  }

  remove(id: number) {
    return `This action removes a #${id} typesOfEvent`;
  }
}
