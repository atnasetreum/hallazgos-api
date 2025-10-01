import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { RiskFactorsController } from './risk-factors.controller';
import { RiskFactorsService } from './risk-factors.service';
import { RiskFactor } from './entities/risk-factor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskFactor])],
  controllers: [RiskFactorsController],
  providers: [RiskFactorsService],
  exports: [TypeOrmModule, RiskFactorsService],
})
export class RiskFactorsModule {}
