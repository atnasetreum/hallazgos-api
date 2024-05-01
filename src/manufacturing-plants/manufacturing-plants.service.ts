import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository } from 'typeorm';

import {
  CreateManufacturingPlantDto,
  QueryManufacturingPlantDto,
  UpdateManufacturingPlantDto,
} from './dto';
import { ManufacturingPlant } from './entities/manufacturing-plant.entity';

@Injectable()
export class ManufacturingPlantsService {
  constructor(
    @InjectRepository(ManufacturingPlant)
    private readonly manufacturingPlantRepository: Repository<ManufacturingPlant>,
  ) {}

  async create(
    createManufacturingPlantDto: CreateManufacturingPlantDto,
  ): Promise<ManufacturingPlant> {
    const manufacturingPlant = await this.manufacturingPlantRepository.create(
      createManufacturingPlantDto,
    );

    return this.manufacturingPlantRepository.save(manufacturingPlant);
  }

  findAll(
    queryManufacturingPlantDto: QueryManufacturingPlantDto,
  ): Promise<ManufacturingPlant[]> {
    const { name } = queryManufacturingPlantDto;

    return this.manufacturingPlantRepository.find({
      where: {
        isActive: true,
        ...(name && { name: ILike(`%${name}%`) }),
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number, isActive = true): Promise<ManufacturingPlant> {
    const manufacturingPlant = await this.manufacturingPlantRepository.findOne({
      where: {
        id,
        ...(isActive && { isActive }),
      },
    });

    if (!manufacturingPlant) {
      throw new NotFoundException(`Planta con ID ${id} no encontrada`);
    }

    return manufacturingPlant;
  }

  async update(
    id: number,
    updateManufacturingPlantDto: UpdateManufacturingPlantDto,
  ): Promise<ManufacturingPlant> {
    await this.findOne(id);

    const manufacturingPlant = await this.manufacturingPlantRepository.preload({
      id,
      ...updateManufacturingPlantDto,
    });

    return this.manufacturingPlantRepository.save(manufacturingPlant);
  }

  async remove(id: number): Promise<ManufacturingPlant> {
    await this.findOne(id);

    await this.manufacturingPlantRepository.update(id, {
      isActive: false,
    });

    return this.manufacturingPlantRepository.findOne({
      where: {
        id,
        isActive: false,
      },
    });
  }
}
