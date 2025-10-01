import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TypeOfInjury } from 'type-of-injuries/entities/type-of-injury.entity';
import { TypesOfEvent } from 'types-of-events/entities/types-of-event.entity';
import { CieDiagnosis } from 'cie-diagnoses/entities/cie-diagnosis.entity';
import { AtMechanism } from 'at-mechanisms/entities/at-mechanism.entity';
import { BodyPart } from 'body-parts/entities/body-part.entity';
import { CiaelsController } from './ciaels.controller';
import { Zone } from 'zones/entities/zone.entity';
import { CiaelsService } from './ciaels.service';
import { Ciael } from './entities/ciael.entity';
import { Employee } from 'employees/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ciael,
      TypesOfEvent,
      Employee,
      CieDiagnosis,
      Zone,
      BodyPart,
      TypeOfInjury,
      AtMechanism,
    ]),
  ],
  controllers: [CiaelsController],
  providers: [CiaelsService],
  exports: [TypeOrmModule, CiaelsService],
})
export class CiaelsModule {}
