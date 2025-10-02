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

  create(createAccidentPositionDto: CreateAccidentPositionDto) {
    return this.accidentPositionRepository.save(createAccidentPositionDto);
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
