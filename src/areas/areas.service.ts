import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateAreaDto, UpdateAreaDto } from './dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  seed() {
    const data = [
      'ADMINISTRATIVO',
      'ECOFIRE',
      'EMPAQUE MANUAL',
      'LIQUIDOS',
      'LOGISTICA BODEGA FASE 2',
      'MANTENIMIENTO',
      'MEZCLADO',
      'PATIO TANQUE',
      'SAPONIFICACION Y SECADO',
      'SERVICIOS GENERALES',
      'SOLIDOS',
      'TALLER DE MANTENIMIENTO',
    ];

    data.forEach(async (name) => {
      const area = this.areaRepository.create({ name });
      await this.areaRepository.save(area);
    });

    return 'Seeding areas...';
  }

  create(createAreaDto: CreateAreaDto) {
    return createAreaDto;
  }

  findAll() {
    return `This action returns all areas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return { id, updateAreaDto };
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
