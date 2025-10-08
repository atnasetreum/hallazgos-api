import { IsOptional, IsPositive } from 'class-validator';

export class FiltersEmployeeDto {
  @IsOptional()
  @IsPositive()
  manufacturingPlantId: number;
}
