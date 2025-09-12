import { PartialType } from '@nestjs/mapped-types';
import { CreateAtAgentDto } from './create-at-agent.dto';

export class UpdateAtAgentDto extends PartialType(CreateAtAgentDto) {}
