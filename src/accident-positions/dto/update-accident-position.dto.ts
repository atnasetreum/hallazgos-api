import { PartialType } from '@nestjs/mapped-types';
import { CreateAccidentPositionDto } from './create-accident-position.dto';

export class UpdateAccidentPositionDto extends PartialType(CreateAccidentPositionDto) {}
