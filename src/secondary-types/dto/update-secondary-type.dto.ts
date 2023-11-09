import { PartialType } from '@nestjs/mapped-types';
import { CreateSecondaryTypeDto } from './create-secondary-type.dto';

export class UpdateSecondaryTypeDto extends PartialType(CreateSecondaryTypeDto) {}
