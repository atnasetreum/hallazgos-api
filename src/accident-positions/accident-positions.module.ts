import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AccidentPositionsController } from './accident-positions.controller';
import { AccidentPositionsService } from './accident-positions.service';
import { AccidentPosition } from './entities/accident-position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccidentPosition])],
  controllers: [AccidentPositionsController],
  providers: [AccidentPositionsService],
})
export class AccidentPositionsModule {}
