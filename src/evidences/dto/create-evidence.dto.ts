import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

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

  @IsNotEmpty()
  @IsPositive()
  typeManage: number;

  @IsOptional()
  @IsPositive()
  supervisor: number;
}
