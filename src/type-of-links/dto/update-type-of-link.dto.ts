import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeOfLinkDto } from './create-type-of-link.dto';

export class UpdateTypeOfLinkDto extends PartialType(CreateTypeOfLinkDto) {}
