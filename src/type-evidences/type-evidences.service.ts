import { Injectable } from '@nestjs/common';

import { CreateTypeEvidenceDto, UpdateTypeEvidenceDto } from './dto';

@Injectable()
export class TypeEvidencesService {
  create(createTypeEvidenceDto: CreateTypeEvidenceDto) {
    return createTypeEvidenceDto;
  }

  findAll() {
    return `This action returns all typeEvidences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeEvidence`;
  }

  update(id: number, updateTypeEvidenceDto: UpdateTypeEvidenceDto) {
    return {
      id,
      updateTypeEvidenceDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} typeEvidence`;
  }
}
