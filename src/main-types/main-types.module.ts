import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MainTypesService } from './main-types.service';
import { MainTypesController } from './main-types.controller';
import { MainType } from './entities/main-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainType])],
  controllers: [MainTypesController],
  providers: [MainTypesService],
  exports: [TypeOrmModule, MainTypesService],
})
export class MainTypesModule {}
