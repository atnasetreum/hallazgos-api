import { IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryZoneDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsPositive()
  manufacturingPlantId: number;
}
