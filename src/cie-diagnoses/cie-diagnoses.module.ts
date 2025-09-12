import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CieDiagnosesController } from './cie-diagnoses.controller';
import { CieDiagnosesService } from './cie-diagnoses.service';
import { CieDiagnosis } from './entities/cie-diagnosis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CieDiagnosis])],
  controllers: [CieDiagnosesController],
  providers: [CieDiagnosesService],
})
export class CieDiagnosesModule {}
