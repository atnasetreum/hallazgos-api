import { Injectable } from '@nestjs/common';

import { CreateRiskFactorDto, UpdateRiskFactorDto } from './dto';

@Injectable()
export class RiskFactorsService {
  create(createRiskFactorDto: CreateRiskFactorDto) {
    return createRiskFactorDto;
  }

  findAll() {
    return `This action returns all riskFactors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} riskFactor`;
  }

  update(id: number, updateRiskFactorDto: UpdateRiskFactorDto) {
    return { id, updateRiskFactorDto };
  }

  remove(id: number) {
    return `This action removes a #${id} riskFactor`;
  }
}
