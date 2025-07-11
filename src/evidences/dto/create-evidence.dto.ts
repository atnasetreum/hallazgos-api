import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateEvidenceDto {
  @IsNotEmpty()
  @IsPositive()
  manufacturingPlantId: number;

  @IsNotEmpty()
  @IsPositive()
  type: number;

  @IsNotEmpty()
  @IsPositive()
  typeHallazgo: number;

  @IsNotEmpty()
  @IsPositive()
  zone: number;

  @IsOptional()
  @IsPositive()
  supervisor: number;

  @IsNotEmpty()
  @IsPositive()
  process: number;

  @IsOptional()
  @IsString()
  description?: string;
}
