import { PartialType } from '@nestjs/mapped-types';
import { CreateAssociatedTaskDto } from './create-associated-task.dto';

export class UpdateAssociatedTaskDto extends PartialType(CreateAssociatedTaskDto) {}
