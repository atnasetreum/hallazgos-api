import { Injectable } from '@nestjs/common';

import { CreateTypeOfLinkDto, UpdateTypeOfLinkDto } from './dto';

@Injectable()
export class TypeOfLinksService {
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
