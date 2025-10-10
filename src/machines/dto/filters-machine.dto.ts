import { IsOptional, IsPositive } from 'class-validator';

export class FiltersMachineDto {
  @IsOptional()
  @IsPositive()
  manufacturingPlantId: number;
}
