import { PartialType } from '@nestjs/mapped-types';
import { CreateCieDiagnosisDto } from './create-cie-diagnosis.dto';

export class UpdateCieDiagnosisDto extends PartialType(CreateCieDiagnosisDto) {}
