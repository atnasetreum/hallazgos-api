import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

import { TypesOfEvaluations } from 'topics/entities/topic.entity';

export class CreateTopicDto {
  @IsString()
  readonly name: string;

  @IsPositive()
  readonly duration: number;

  @IsEnum(TypesOfEvaluations)
  readonly typeOfEvaluation: TypesOfEvaluations;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @Type(() => Number)
  readonly manufacturingPlantsIds: number[];
}
