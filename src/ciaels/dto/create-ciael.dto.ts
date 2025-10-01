import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCiaelDto {
  @IsPositive()
  manufacturingPlantId: number;

  @IsPositive()
  typeOfEventId: number;

  @IsString()
  description: string;

  @IsPositive()
  employeeId: number;

  @Type(() => Date)
  @IsDate()
  eventDate: Date;

  @IsPositive()
  cieDiagnosisId: number;

  @IsOptional()
  @IsPositive()
  daysOfDisability?: number;

  @IsPositive()
  accidentPositionId: number;

  @IsPositive()
  zoneId: number;

  @IsPositive()
  bodyPartId: number;

  @IsPositive()
  atAgentId: number;

  @IsPositive()
  typeOfInjuryId: number;

  @IsPositive()
  atMechanismId: number;

  @IsPositive()
  workingDayId: number;

  @IsOptional()
  @IsPositive()
  timeWorked: number;

  @IsBoolean()
  usualWork: boolean;

  @IsPositive()
  typeOfLinkId: number;

  @IsBoolean()
  isDeath: boolean;

  @IsOptional()
  @IsPositive()
  machineId?: number;

  @IsOptional()
  @IsString()
  machineName?: string;

  @IsBoolean()
  isInside: boolean;

  @IsPositive()
  associatedTaskId: number;

  @IsPositive()
  areaLeaderId: number;

  @IsPositive()
  riskFactorId: number;

  @IsPositive()
  natureOfEventsId: number;

  @IsOptional()
  @IsPositive()
  managerId?: number;
}
