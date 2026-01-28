import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingGuideDto } from './create-training-guide.dto';

export class UpdateTrainingGuideDto extends PartialType(CreateTrainingGuideDto) {}
