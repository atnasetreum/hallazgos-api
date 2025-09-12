import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeOfInjuryDto } from './create-type-of-injury.dto';

export class UpdateTypeOfInjuryDto extends PartialType(CreateTypeOfInjuryDto) {}
