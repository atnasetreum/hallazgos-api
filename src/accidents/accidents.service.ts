import { Injectable } from '@nestjs/common';

import { CreateAccidentDto, UpdateAccidentDto } from './dto';

@Injectable()
export class AccidentsService {
  create(createAccidentDto: CreateAccidentDto) {
    return createAccidentDto;
  }

  findAll() {
    return `This action returns all accidents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accident`;
  }

  update(id: number, updateAccidentDto: UpdateAccidentDto) {
    return { id, updateAccidentDto };
  }

  remove(id: number) {
    return `This action removes a #${id} accident`;
  }
}
