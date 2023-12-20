import { IsNotEmpty, IsString } from 'class-validator';

export class CommentEvidenceDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
