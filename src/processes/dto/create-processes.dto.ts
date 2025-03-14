import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProcessesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  manufacturingPlantId: number;
}
