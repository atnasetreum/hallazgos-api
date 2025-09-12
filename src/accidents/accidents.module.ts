import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AccidentsController } from './accidents.controller';
import { AccidentsService } from './accidents.service';
import { Accident } from './entities/accident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accident])],
  controllers: [AccidentsController],
  providers: [AccidentsService],
})
export class AccidentsModule {}
