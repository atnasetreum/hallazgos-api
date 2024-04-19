import { IsOptional, IsString } from 'class-validator';

export class QueryManufacturingPlantDto {
  @IsOptional()
  @IsString()
  name: string;
}
