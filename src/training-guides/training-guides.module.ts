import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TrainingGuidesController } from './training-guides.controller';
import { TrainingGuidesService } from './training-guides.service';
import { Employee, EmployeePosition } from 'employees/entities';
import {
  TrainingGuide,
  TrainingGuideEmployee,
  TrainingGuideEmployeeEvaluation,
  TrainingGuideTopic,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingGuide,
      EmployeePosition,
      TrainingGuideTopic,
      Employee,
      TrainingGuideEmployee,
      TrainingGuideEmployeeEvaluation,
    ]),
  ],
  controllers: [TrainingGuidesController],
  providers: [TrainingGuidesService],
  exports: [TypeOrmModule, TrainingGuidesService],
})
export class TrainingGuidesModule {}
