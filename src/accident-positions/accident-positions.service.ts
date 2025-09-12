import { Injectable } from '@nestjs/common';

import { CreateAccidentPositionDto, UpdateAccidentPositionDto } from './dto';

@Injectable()
export class AccidentPositionsService {
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
