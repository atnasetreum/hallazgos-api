import { IsOptional, IsPositive } from 'class-validator';

export class QueryConfigsTgDto {
  @IsOptional()
  @IsPositive()
  readonly positionId?: number;

  @IsOptional()
  @IsPositive()
  readonly manufacturingPlantId?: number;
}
