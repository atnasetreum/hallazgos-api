import { IsDate, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCiaelDto {
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
  zoneId: number;

  @IsPositive()
  bodyPartId: number;

  @IsPositive()
  atAgentId: number;

  @IsPositive()
  typeOfInjuryId: number;

  @IsPositive()
  atMechanismId: number;
}
