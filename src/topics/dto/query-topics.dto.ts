import { IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryTopicDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsPositive()
  readonly manufacturingPlantId?: number;
}
