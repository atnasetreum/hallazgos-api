import { PartialType } from '@nestjs/mapped-types';
import { CreateNatureOfEventDto } from './create-nature-of-event.dto';

export class UpdateNatureOfEventDto extends PartialType(CreateNatureOfEventDto) {}
