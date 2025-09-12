import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BodyPartsController } from './body-parts.controller';
import { BodyPartsService } from './body-parts.service';
import { BodyPart } from './entities/body-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BodyPart])],
  controllers: [BodyPartsController],
  providers: [BodyPartsService],
})
export class BodyPartsModule {}
