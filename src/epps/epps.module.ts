import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { EppsController } from './epps.controller';
import { Equipment } from 'equipments/entities';
import { Epp, EppEquipment } from './entities';
import { Employee } from 'employees/entities';
import { EppsService } from './epps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Epp, EppEquipment, Employee, Equipment])],
  controllers: [EppsController],
  providers: [EppsService],
})
export class EppsModule {}
