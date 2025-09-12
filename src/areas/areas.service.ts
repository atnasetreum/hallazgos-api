import { Injectable } from '@nestjs/common';

import { CreateAreaDto, UpdateAreaDto } from './dto';

@Injectable()
export class AreasService {
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
