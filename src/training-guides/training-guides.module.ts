import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TrainingGuidesController } from './training-guides.controller';
import { TrainingGuide, TrainingGuideEvaluation } from './entities';
import { TrainingGuidesService } from './training-guides.service';
import { ConfigsTgModule } from 'configs-tg/configs-tg.module';
import { EmployeesModule } from 'employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingGuide, TrainingGuideEvaluation]),
    ConfigsTgModule,
    EmployeesModule,
  ],
  controllers: [TrainingGuidesController],
  providers: [TrainingGuidesService],
  exports: [TypeOrmModule, TrainingGuidesService],
})
export class TrainingGuidesModule {}
