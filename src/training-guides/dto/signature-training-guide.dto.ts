import { IsPositive, IsString } from 'class-validator';

export class SignatureDto {
  @IsPositive()
  readonly userId: number;

  @IsString()
  readonly type: string;

  @IsString()
  readonly signature: string;
}
