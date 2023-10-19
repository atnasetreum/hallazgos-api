import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManufacturingPlantsService } from './manufacturing-plants.service';
import { ManufacturingPlantsController } from './manufacturing-plants.controller';
import { ManufacturingPlant } from './entities/manufacturing-plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturingPlant])],
  controllers: [ManufacturingPlantsController],
  providers: [ManufacturingPlantsService],
  exports: [TypeOrmModule, ManufacturingPlantsService],
})
export class ManufacturingPlantsModule {}
