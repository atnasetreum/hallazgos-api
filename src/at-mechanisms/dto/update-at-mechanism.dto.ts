import { PartialType } from '@nestjs/mapped-types';
import { CreateAtMechanismDto } from './create-at-mechanism.dto';

export class UpdateAtMechanismDto extends PartialType(CreateAtMechanismDto) {}
