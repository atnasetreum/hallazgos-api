import { Injectable } from '@nestjs/common';

import { CreateTypeOfInjuryDto, UpdateTypeOfInjuryDto } from './dto';

@Injectable()
export class TypeOfInjuriesService {
  create(createTypeOfInjuryDto: CreateTypeOfInjuryDto) {
    return createTypeOfInjuryDto;
  }

  findAll() {
    return `This action returns all typeOfInjuries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeOfInjury`;
  }

  update(id: number, updateTypeOfInjuryDto: UpdateTypeOfInjuryDto) {
    return { id, updateTypeOfInjuryDto };
  }

  remove(id: number) {
    return `This action removes a #${id} typeOfInjury`;
  }
}
