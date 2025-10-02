import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateRiskFactorDto, UpdateRiskFactorDto } from './dto';
import { RiskFactor } from './entities/risk-factor.entity';

@Injectable()
export class RiskFactorsService {
  constructor(
    @InjectRepository(RiskFactor)
    private readonly riskFactorRepository: Repository<RiskFactor>,
  ) {}

  create(createRiskFactorDto: CreateRiskFactorDto) {
    return this.riskFactorRepository.save(createRiskFactorDto);
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
