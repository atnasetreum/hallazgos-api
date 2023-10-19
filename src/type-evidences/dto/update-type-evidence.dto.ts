import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeEvidenceDto } from './create-type-evidence.dto';

export class UpdateTypeEvidenceDto extends PartialType(CreateTypeEvidenceDto) {}
