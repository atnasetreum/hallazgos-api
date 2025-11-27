import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AreaOfBehavior, RulesOfLife, StandardOfBehavior } from './entities';
import { RulesOfLifeController } from './rules-of-life.controller';
import { RulesOfLifeService } from './rules-of-life.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RulesOfLife, StandardOfBehavior, AreaOfBehavior]),
  ],
  controllers: [RulesOfLifeController],
  providers: [RulesOfLifeService],
  exports: [TypeOrmModule, RulesOfLifeService],
})
export class RulesOfLifeModule {}
