import { Injectable } from '@nestjs/common';

import { CreateCieDiagnosisDto, UpdateCieDiagnosisDto } from './dto';

@Injectable()
export class CieDiagnosesService {
  create(createCieDiagnosisDto: CreateCieDiagnosisDto) {
    return createCieDiagnosisDto;
  }

  findAll() {
    return `This action returns all cieDiagnoses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cieDiagnosis`;
  }

  update(id: number, updateCieDiagnosisDto: UpdateCieDiagnosisDto) {
    return { id, updateCieDiagnosisDto };
  }

  remove(id: number) {
    return `This action removes a #${id} cieDiagnosis`;
  }
}
