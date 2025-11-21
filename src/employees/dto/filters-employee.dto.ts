import { IsOptional, IsPositive, IsString } from 'class-validator';

export class FiltersEmployeeDto {
  @IsOptional()
  @IsPositive()
  manufacturingPlantId?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
