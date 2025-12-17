import { IsOptional, IsPositive, IsString } from 'class-validator';

export class FiltersEmployeeDto {
  @IsOptional()
  @IsPositive()
  readonly manufacturingPlantId?: number;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsPositive()
  readonly positionId?: number;

  @IsOptional()
  @IsPositive()
  readonly assignedUserId?: number;
}
