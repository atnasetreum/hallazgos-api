import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateIcsDto {
  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly imgEvidence?: string;

  @IsPositive()
  readonly numberPeopleObserved: number;

  @IsPositive()
  readonly manufacturingPlantId: number;

  @IsPositive()
  readonly ruleOfLifeId: number;

  @IsPositive()
  readonly standardOfBehaviorId: number;

  @IsPositive()
  readonly areaOfBehaviorId: number;

  @ArrayMinSize(1)
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsPositive({ each: true })
  readonly employeesIds: number[];
}
