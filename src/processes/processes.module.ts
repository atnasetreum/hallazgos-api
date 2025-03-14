import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { Processes } from './entities/processes.entity';
import { ManufacturingPlantsModule } from '../manufacturing-plants/manufacturing-plants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Processes]), ManufacturingPlantsModule],
  controllers: [ProcessesController],
  providers: [ProcessesService],
  exports: [TypeOrmModule, ProcessesService],
})
export class ProcessesModule {}
