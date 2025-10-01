import { Injectable } from '@nestjs/common';

import { CreateAccidentPositionDto, UpdateAccidentPositionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccidentPosition } from './entities/accident-position.entity';

@Injectable()
export class AccidentPositionsService {
  constructor(
    @InjectRepository(AccidentPosition)
    private readonly accidentPositionRepository: Repository<AccidentPosition>,
  ) {}

  seed() {
    const data = [
      'Jefe de Servicios Generales',
      'Operador Saponificación',
      'Operador ayudante de mezclado',
      'Operador de acabado',
      'Operador de Empaque',
      'OPERADOR DE EMPAQUE - NIVEL 1',
      'Operador de Mantenimiento Mecanico',
      'Operador de Secado',
      'Operador de Secado N1',
      'Operador general',
      'Operador general de empaque',
      'Operador logistico granel',
      'Operario Ayudante de Secado',
      'Operario de Acabado',
      'Operario de mantenimiento electrico',
      'Operario de Mantenimiento mecanico',
      'Operario de puesta a punto',
      'Operario general',
      'OPERARIO LOCATIVO DE INFRAESTRUCTURA',
      'Operario Mantenimiento Locativo',
      'Operario Mantenimiento Mecanico',
    ];

    data.forEach(async (name) => {
      const accidentPosition = this.accidentPositionRepository.create({ name });
      await this.accidentPositionRepository.save(accidentPosition);
    });

    return 'Seeding accident positions...';
  }

  create(createAccidentPositionDto: CreateAccidentPositionDto) {
    return createAccidentPositionDto;
  }

  findAll() {
    return `This action returns all accidentPositions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accidentPosition`;
  }

  update(id: number, updateAccidentPositionDto: UpdateAccidentPositionDto) {
    return { id, updateAccidentPositionDto };
  }

  remove(id: number) {
    return `This action removes a #${id} accidentPosition`;
  }
}
