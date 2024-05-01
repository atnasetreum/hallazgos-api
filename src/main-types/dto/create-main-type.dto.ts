import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMainTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
