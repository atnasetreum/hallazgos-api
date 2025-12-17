import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class EvaluationDto {
  @IsPositive()
  readonly topicId: number;

  @IsOptional()
  @IsDate()
  readonly date: Date | null;

  @IsOptional()
  @IsString()
  readonly evaluation: string;

  @IsOptional()
  @IsString()
  readonly observations: string;
}

export class SaveTrainingGuideEmployeeDto {
  @IsDate()
  readonly startDate: Date;

  @IsPositive()
  readonly positionId: number;

  @IsPositive()
  readonly employeeId: number;

  @IsPositive()
  readonly areaTgeId: number;

  @IsPositive()
  readonly humanResourceTgeId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvaluationDto)
  readonly evaluations: EvaluationDto[];
}
