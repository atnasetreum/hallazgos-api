import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';
import { Zone } from './entities/zone.entity';
import { ManufacturingPlantsModule } from '../manufacturing-plants/manufacturing-plants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Zone]), ManufacturingPlantsModule],
  controllers: [ZonesController],
  providers: [ZonesService],
  exports: [TypeOrmModule, ZonesService],
})
export class ZonesModule {}
