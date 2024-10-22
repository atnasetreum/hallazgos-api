import { IsOptional, IsPositive, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  status: string;
}
