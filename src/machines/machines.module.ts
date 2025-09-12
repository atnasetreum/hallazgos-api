import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { MachinesController } from './machines.controller';
import { MachinesService } from './machines.service';
import { Machine } from './entities/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine])],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}
