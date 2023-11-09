import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EvidencesService } from './evidences.service';
import { EvidencesController } from './evidences.controller';
import { Evidence } from './entities/evidence.entity';
import { ManufacturingPlantsModule } from 'manufacturing-plants/manufacturing-plants.module';
import { MainTypesModule } from 'main-types/main-types.module';
import { SecondaryTypesModule } from 'secondary-types/secondary-types.module';
import { ZonesModule } from 'zones/zones.module';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evidence]),
    ManufacturingPlantsModule,
    MainTypesModule,
    SecondaryTypesModule,
    ZonesModule,
    UsersModule,
  ],
  controllers: [EvidencesController],
  providers: [EvidencesService],
  exports: [TypeOrmModule, EvidencesService],
})
export class EvidencesModule {}
