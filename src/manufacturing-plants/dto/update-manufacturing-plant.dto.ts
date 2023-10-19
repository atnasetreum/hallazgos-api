import { PartialType } from '@nestjs/mapped-types';
import { CreateManufacturingPlantDto } from './create-manufacturing-plant.dto';

export class UpdateManufacturingPlantDto extends PartialType(CreateManufacturingPlantDto) {}
