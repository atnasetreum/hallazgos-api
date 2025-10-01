import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateBodyPartDto, UpdateBodyPartDto } from './dto';
import { BodyPart } from './entities/body-part.entity';

@Injectable()
export class BodyPartsService {
  constructor(
    @InjectRepository(BodyPart)
    private readonly bodyPartRepository: Repository<BodyPart>,
  ) {}

  seed() {
    const data = [
      'Cabeza',
      'Cuello',
      'Manos',
      'Miembros inferiores',
      'Miembros superiores',
      'Ojos',
      'Pies',
      'Tronco (Incluye espalda, médula espinal, columna vertebral, pelvis)',
    ];

    data.forEach(async (name) => {
      const bodyPart = this.bodyPartRepository.create({ name });
      await this.bodyPartRepository.save(bodyPart);
    });

    return 'Seeding body parts...';
  }

  create(createBodyPartDto: CreateBodyPartDto) {
    return createBodyPartDto;
  }

  findAll() {
    return `This action returns all bodyParts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyPart`;
  }

  update(id: number, updateBodyPartDto: UpdateBodyPartDto) {
    return { id, updateBodyPartDto };
  }

  remove(id: number) {
    return `This action removes a #${id} bodyPart`;
  }
}
