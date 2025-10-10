import { IsOptional, IsPositive } from 'class-validator';

export class FiltersAssociatedTaskDto {
  @IsOptional()
  @IsPositive()
  manufacturingPlantId: number;
}
