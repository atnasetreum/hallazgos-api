import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  rule: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  manufacturingPlantNames: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  zoneNames: string[];

  @IsOptional()
  @IsString()
  typeResponsible: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  manufacturingPlantNamesMaintenanceSecurity: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  zonesMaintenanceSecurity: string[];
}
