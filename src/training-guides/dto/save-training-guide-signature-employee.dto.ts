import { IsPositive, IsString } from 'class-validator';

export class SaveTrainingGuideEmployeeSignatureDto {
  @IsPositive()
  readonly userId: number;

  @IsString()
  readonly type: string;

  @IsString()
  readonly signature: string;
}
