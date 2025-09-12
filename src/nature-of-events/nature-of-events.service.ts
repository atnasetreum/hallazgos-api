import { Injectable } from '@nestjs/common';

import { CreateNatureOfEventDto, UpdateNatureOfEventDto } from './dto';

@Injectable()
export class NatureOfEventsService {
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
