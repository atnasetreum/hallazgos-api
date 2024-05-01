import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateSecondaryTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  mainTypeId: number;
}
