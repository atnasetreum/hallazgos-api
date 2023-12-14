import { IsOptional, IsPositive } from 'class-validator';

export class QueryEvidenceDto {
  @IsOptional()
  @IsPositive()
  manufacturingPlantId: number;

  @IsOptional()
  @IsPositive()
  mainTypeId: number;

  @IsOptional()
  @IsPositive()
  secondaryType: number;

  @IsOptional()
  @IsPositive()
  zone: number;
}
