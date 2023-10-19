import { Module } from '@nestjs/common';

import { TypeEvidencesService } from './type-evidences.service';
import { TypeEvidencesController } from './type-evidences.controller';
import { TypeEvidence } from './entities/type-evidence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeEvidence])],
  controllers: [TypeEvidencesController],
  providers: [TypeEvidencesService],
  exports: [TypeOrmModule, TypeEvidencesService],
})
export class TypeEvidencesModule {}
