import { Injectable } from '@nestjs/common';

import { CreateTypeDto, UpdateTypeDto } from './dto';

@Injectable()
export class TypesService {
  create(createTypeDto: CreateTypeDto) {
    return createTypeDto;
  }

  findAll() {
    return `This action returns all types`;
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return { id, updateTypeDto };
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
