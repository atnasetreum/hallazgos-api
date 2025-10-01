import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TypeOfLinksController } from './type-of-links.controller';
import { TypeOfLinksService } from './type-of-links.service';
import { TypeOfLink } from './entities/type-of-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfLink])],
  controllers: [TypeOfLinksController],
  providers: [TypeOfLinksService],
  exports: [TypeOrmModule, TypeOfLinksService],
})
export class TypeOfLinksModule {}
