import { IsOptional, IsPositive, IsString } from 'class-validator';

export class QuerySecondaryTypeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsPositive()
  mainTypeId: number;
}
