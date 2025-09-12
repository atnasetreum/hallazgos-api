import { Injectable } from '@nestjs/common';

import { CreateTypesOfEventDto, UpdateTypesOfEventDto } from './dto';

@Injectable()
export class TypesOfEventsService {
  create(createTypesOfEventDto: CreateTypesOfEventDto) {
    return createTypesOfEventDto;
  }

  findAll() {
    return `This action returns all typesOfEvents`;
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
