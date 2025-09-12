import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AtMechanismsController } from './at-mechanisms.controller';
import { AtMechanismsService } from './at-mechanisms.service';
import { AtMechanism } from './entities/at-mechanism.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AtMechanism])],
  controllers: [AtMechanismsController],
  providers: [AtMechanismsService],
})
export class AtMechanismsModule {}
