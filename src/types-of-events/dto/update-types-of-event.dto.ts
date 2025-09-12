import { PartialType } from '@nestjs/mapped-types';
import { CreateTypesOfEventDto } from './create-types-of-event.dto';

export class UpdateTypesOfEventDto extends PartialType(CreateTypesOfEventDto) {}
