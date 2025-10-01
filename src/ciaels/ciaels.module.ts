import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { AccidentPosition } from 'accident-positions/entities/accident-position.entity';
import { AssociatedTask } from 'associated-tasks/entities/associated-task.entity';
import { NatureOfEvent } from 'nature-of-events/entities/nature-of-event.entity';
import { TypeOfInjury } from 'type-of-injuries/entities/type-of-injury.entity';
import { TypesOfEvent } from 'types-of-events/entities/types-of-event.entity';
import { CieDiagnosis } from 'cie-diagnoses/entities/cie-diagnosis.entity';
import { AtMechanism } from 'at-mechanisms/entities/at-mechanism.entity';
import { TypeOfLink } from 'type-of-links/entities/type-of-link.entity';
import { WorkingDay } from 'working-days/entities/working-day.entity';
import { RiskFactor } from 'risk-factors/entities/risk-factor.entity';
import { BodyPart } from 'body-parts/entities/body-part.entity';
import { Machine } from 'machines/entities/machine.entity';
import { CiaelsController } from './ciaels.controller';
import { User } from 'users/entities/user.entity';
import { Zone } from 'zones/entities/zone.entity';
import { CiaelsService } from './ciaels.service';
import { Ciael } from './entities/ciael.entity';
import { Employee } from 'employees/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ciael,
      ManufacturingPlant,
      TypesOfEvent,
      Employee,
      CieDiagnosis,
      Zone,
      BodyPart,
      TypeOfInjury,
      AtMechanism,
      WorkingDay,
      TypeOfLink,
      AccidentPosition,
      Machine,
      AssociatedTask,
      User,
      RiskFactor,
      NatureOfEvent,
    ]),
  ],
  controllers: [CiaelsController],
  providers: [CiaelsService],
  exports: [TypeOrmModule, CiaelsService],
})
export class CiaelsModule {}
