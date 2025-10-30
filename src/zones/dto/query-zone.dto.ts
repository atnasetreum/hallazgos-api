import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class QueryZoneDto {
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

  @IsOptional()
  @IsBoolean()
  withArea: boolean = false;
}
