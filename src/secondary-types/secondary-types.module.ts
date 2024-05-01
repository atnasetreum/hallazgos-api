import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SecondaryTypesService } from './secondary-types.service';
import { SecondaryTypesController } from './secondary-types.controller';
import { SecondaryType } from './entities/secondary-type.entity';
import { MainTypesModule } from 'main-types/main-types.module';

@Module({
  imports: [TypeOrmModule.forFeature([SecondaryType]), MainTypesModule],
  controllers: [SecondaryTypesController],
  providers: [SecondaryTypesService],
  exports: [TypeOrmModule, SecondaryTypesService],
})
export class SecondaryTypesModule {}
