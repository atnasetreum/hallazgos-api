import { PartialType } from '@nestjs/mapped-types';

import { CreateIcsDto } from './create-ics.dto';

export class UpdateIcsDto extends PartialType(CreateIcsDto) {}
