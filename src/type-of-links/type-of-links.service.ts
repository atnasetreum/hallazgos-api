import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateTypeOfLinkDto, UpdateTypeOfLinkDto } from './dto';
import { TypeOfLink } from './entities/type-of-link.entity';

@Injectable()
export class TypeOfLinksService {
  constructor(
    @InjectRepository(TypeOfLink)
    private readonly typeOfLinkRepository: Repository<TypeOfLink>,
  ) {}

  seed() {
    const data = ['Directo', 'Temporal'];

    data.forEach(async (name) => {
      const typeOfLink = this.typeOfLinkRepository.create({ name });
      await this.typeOfLinkRepository.save(typeOfLink);
    });

    return 'Seeding type of links...';
  }

  create(createTypeOfLinkDto: CreateTypeOfLinkDto) {
    return createTypeOfLinkDto;
  }

  findAll() {
    return `This action returns all typeOfLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeOfLink`;
  }

  update(id: number, updateTypeOfLinkDto: UpdateTypeOfLinkDto) {
    return { id, updateTypeOfLinkDto };
  }

  remove(id: number) {
    return `This action removes a #${id} typeOfLink`;
  }
}
