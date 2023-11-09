import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SecondaryTypesService } from './secondary-types.service';
import { SecondaryTypesController } from './secondary-types.controller';
import { SecondaryType } from './entities/secondary-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecondaryType])],
  controllers: [SecondaryTypesController],
  providers: [SecondaryTypesService],
  exports: [TypeOrmModule, SecondaryTypesService],
})
export class SecondaryTypesModule {}
