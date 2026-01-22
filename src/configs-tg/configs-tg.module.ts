import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigsTgController } from './configs-tg.controller';
import { ConfigsTgService } from './configs-tg.service';
import { ConfigsTg, ConfigsTopicTg } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigsTg, ConfigsTopicTg])],
  controllers: [ConfigsTgController],
  providers: [ConfigsTgService],
  exports: [TypeOrmModule, ConfigsTgService],
})
export class ConfigsTgModule {}
