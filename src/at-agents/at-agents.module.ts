import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AtAgentsController } from './at-agents.controller';
import { AtAgentsService } from './at-agents.service';
import { AtAgent } from './entities/at-agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AtAgent])],
  controllers: [AtAgentsController],
  providers: [AtAgentsService],
})
export class AtAgentsModule {}
