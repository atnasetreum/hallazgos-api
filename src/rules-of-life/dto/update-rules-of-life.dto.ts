import { PartialType } from '@nestjs/mapped-types';
import { CreateRulesOfLifeDto } from './create-rules-of-life.dto';

export class UpdateRulesOfLifeDto extends PartialType(CreateRulesOfLifeDto) {}
