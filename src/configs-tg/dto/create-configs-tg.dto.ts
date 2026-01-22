import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';

export class TopicDto {
  @IsPositive()
  readonly id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  readonly responsibleIds: number[];
}

export class CreateConfigsTgDto {
  @IsPositive()
  readonly positionId: number;

  @IsPositive()
  readonly manufacturingPlantId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicDto)
  topics: TopicDto[];

  @IsPositive()
  readonly areaManagerId: number;

  @IsPositive()
  readonly humanResourceManagerId: number;
}
