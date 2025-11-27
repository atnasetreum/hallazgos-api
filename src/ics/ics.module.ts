import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { RulesOfLife } from 'rules-of-life/entities';
import { IcsController } from './ics.controller';
import { Ics } from './entities/ics.entity';
import { IcsService } from './ics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ics, RulesOfLife])],
  controllers: [IcsController],
  providers: [IcsService],
  exports: [TypeOrmModule, IcsService],
})
export class IcsModule {}
