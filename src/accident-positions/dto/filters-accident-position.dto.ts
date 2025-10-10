import { IsOptional, IsPositive } from 'class-validator';

export class FiltersAccidentPositionDto {
  @IsOptional()
  @IsPositive()
  manufacturingPlantId: number;
}
