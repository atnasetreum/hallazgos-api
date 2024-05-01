import { IsOptional, IsString } from 'class-validator';

export class QueryMainTypeDto {
  @IsOptional()
  @IsString()
  name: string;
}
