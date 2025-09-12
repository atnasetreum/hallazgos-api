import { Injectable } from '@nestjs/common';

import { CreateBodyPartDto, UpdateBodyPartDto } from './dto';

@Injectable()
export class BodyPartsService {
  create(createBodyPartDto: CreateBodyPartDto) {
    return createBodyPartDto;
  }

  findAll() {
    return `This action returns all bodyParts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bodyPart`;
  }

  update(id: number, updateBodyPartDto: UpdateBodyPartDto) {
    return { id, updateBodyPartDto };
  }

  remove(id: number) {
    return `This action removes a #${id} bodyPart`;
  }
}
