import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  CreateManufacturingPlantDto,
  UpdateManufacturingPlantDto,
} from './dto';
import { ManufacturingPlant } from './entities/manufacturing-plant.entity';

@Injectable()
export class ManufacturingPlantsService {
  constructor(
    @InjectRepository(ManufacturingPlant)
    private readonly manufacturingPlantRepository: Repository<ManufacturingPlant>,
  ) {}

  create(createManufacturingPlantDto: CreateManufacturingPlantDto) {
    return createManufacturingPlantDto;
  }

  findAll() {
    return this.manufacturingPlantRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  findOne(id: number) {
    return this.manufacturingPlantRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  update(id: number, updateManufacturingPlantDto: UpdateManufacturingPlantDto) {
    return { id, updateManufacturingPlantDto };
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturingPlant`;
  }
}
