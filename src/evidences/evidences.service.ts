import { Injectable } from '@nestjs/common';

import { CreateEvidenceDto, UpdateEvidenceDto } from './dto';

@Injectable()
export class EvidencesService {
  create(createEvidenceDto: CreateEvidenceDto) {
    return createEvidenceDto;
  }

  findAll() {
    return `This action returns all evidences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evidence`;
  }

  update(id: number, updateEvidenceDto: UpdateEvidenceDto) {
    return { id, updateEvidenceDto };
  }

  remove(id: number) {
    return `This action removes a #${id} evidence`;
  }
}
