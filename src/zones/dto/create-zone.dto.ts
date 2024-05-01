import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateZoneDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  manufacturingPlantId: number;
}
