import { Injectable } from '@nestjs/common';

import { CreateAtMechanismDto, UpdateAtMechanismDto } from './dto';

@Injectable()
export class AtMechanismsService {
  create(createAtMechanismDto: CreateAtMechanismDto) {
    return createAtMechanismDto;
  }

  findAll() {
    return `This action returns all atMechanisms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atMechanism`;
  }

  update(id: number, updateAtMechanismDto: UpdateAtMechanismDto) {
    return { id, updateAtMechanismDto };
  }

  remove(id: number) {
    return `This action removes a #${id} atMechanism`;
  }
}
