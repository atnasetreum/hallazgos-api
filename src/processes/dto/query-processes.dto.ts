import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class QueryProcessesDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsPositive()
  manufacturingPlantId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  manufacturingPlantNames: string[];
}
