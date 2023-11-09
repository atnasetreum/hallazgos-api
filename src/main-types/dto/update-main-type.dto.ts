import { PartialType } from '@nestjs/mapped-types';
import { CreateMainTypeDto } from './create-main-type.dto';

export class UpdateMainTypeDto extends PartialType(CreateMainTypeDto) {}
