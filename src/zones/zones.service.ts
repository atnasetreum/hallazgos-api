import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository } from 'typeorm';

import { Zone } from 'zones/entities/zone.entity';
import { CreateZoneDto, QueryZoneDto, UpdateZoneDto } from './dto';
import { ManufacturingPlantsService } from 'manufacturing-plants/manufacturing-plants.service';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    private readonly manufacturingPlantsService: ManufacturingPlantsService,
  ) {}

  async create(createZoneDto: CreateZoneDto): Promise<Zone> {
    const manufacturingPlant = await this.manufacturingPlantsService.findOne(
      createZoneDto.manufacturingPlantId,
    );

    const zone = await this.zoneRepository.create({
      ...createZoneDto,
      manufacturingPlant,
    });

    return this.zoneRepository.save(zone);
  }

  findAll(queryZoneDto: QueryZoneDto): Promise<Zone[]> {
    const { name, manufacturingPlantId } = queryZoneDto;

    return this.zoneRepository.find({
      where: {
        isActive: true,
        ...(name && { name: ILike(`%${name}%`) }),
        ...(manufacturingPlantId && {
          manufacturingPlant: { id: manufacturingPlantId },
        }),
      },
      relations: ['manufacturingPlant'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number, isActive = true): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({
      where: {
        id,
        ...(isActive && { isActive }),
      },
      relations: ['manufacturingPlant'],
    });

    if (!zone) {
      throw new NotFoundException(`Planta con ID ${id} no encontrado`);
    }

    return zone;
  }

  async update(id: number, updateZoneDto: UpdateZoneDto): Promise<Zone> {
    await this.findOne(id);

    const manufacturingPlant = await this.manufacturingPlantsService.findOne(
      updateZoneDto.manufacturingPlantId,
    );

    const zone = await this.zoneRepository.preload({
      id,
      ...updateZoneDto,
      manufacturingPlant,
    });

    return this.zoneRepository.save(zone);
  }

  async remove(id: number): Promise<Zone> {
    await this.findOne(id);

    await this.zoneRepository.update(id, {
      isActive: false,
    });

    return this.zoneRepository.findOne({
      where: {
        id,
        isActive: false,
      },
    });
  }
}
