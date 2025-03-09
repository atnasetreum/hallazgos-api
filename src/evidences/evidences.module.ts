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
import { Comment } from './entities/comments.entity';
import { EvidencesResolver } from './evidences.resolver';
import { TypeManagesModule } from 'type-manages/type-manages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evidence, Comment]),
    ManufacturingPlantsModule,
    MainTypesModule,
    SecondaryTypesModule,
    ZonesModule,
    UsersModule,
    TypeManagesModule,
  ],
  controllers: [EvidencesController],
  providers: [EvidencesService, EvidencesResolver],
  exports: [TypeOrmModule, EvidencesService],
})
export class EvidencesModule {}
