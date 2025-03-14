import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ManufacturingPlantsModule } from 'manufacturing-plants/manufacturing-plants.module';
import { ZonesModule } from 'zones/zones.module';
import { ProcessesModule } from 'processes/processes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ManufacturingPlantsModule,
    ZonesModule,
    ProcessesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
