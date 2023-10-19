import { Injectable } from '@nestjs/common';

import {
  CreateManufacturingPlantDto,
  UpdateManufacturingPlantDto,
} from './dto';

@Injectable()
export class ManufacturingPlantsService {
  create(createManufacturingPlantDto: CreateManufacturingPlantDto) {
    return createManufacturingPlantDto;
  }

  findAll() {
    return `This action returns all manufacturingPlants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacturingPlant`;
  }

  update(id: number, updateManufacturingPlantDto: UpdateManufacturingPlantDto) {
    return { id, updateManufacturingPlantDto };
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturingPlant`;
  }
}
