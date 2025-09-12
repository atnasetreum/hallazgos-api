import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TypesOfEventsController } from './types-of-events.controller';
import { TypesOfEventsService } from './types-of-events.service';
import { TypesOfEvent } from './entities/types-of-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypesOfEvent])],
  controllers: [TypesOfEventsController],
  providers: [TypesOfEventsService],
})
export class TypesOfEventsModule {}
