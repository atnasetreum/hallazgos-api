import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, In, Repository } from 'typeorm';

import { ManufacturingPlantsService } from 'manufacturing-plants/manufacturing-plants.service';
import { Processes } from './entities/processes.entity';
import {
  CreateProcessesDto,
  QueryProcessesDto,
  UpdateProcessesDto,
} from './dto';

@Injectable()
export class ProcessesService {
  constructor(
    @InjectRepository(Processes)
    private readonly processesRepository: Repository<Processes>,
    private readonly manufacturingPlantsService: ManufacturingPlantsService,
  ) {}

  async create(createProcessesDto: CreateProcessesDto): Promise<Processes> {
    const manufacturingPlant = await this.manufacturingPlantsService.findOne(
      createProcessesDto.manufacturingPlantId,
    );

    const processes = await this.processesRepository.create({
      ...createProcessesDto,
      manufacturingPlant,
    });

    return this.processesRepository.save(processes);
  }

  async findAll(queryProcessesDto: QueryProcessesDto): Promise<Processes[]> {
    const { name, manufacturingPlantId, manufacturingPlantNames } =
      queryProcessesDto;

    const manufacturingPlantIds = [];

    if (manufacturingPlantId) {
      manufacturingPlantIds.push(manufacturingPlantId);
    } else if (manufacturingPlantNames?.length && !manufacturingPlantId) {
      for (let i = 0, t = manufacturingPlantNames.length; i < t; i++) {
        const manufacturingPlantName = manufacturingPlantNames[i];

        const manufacturing =
          await this.manufacturingPlantsService.findOneByName(
            manufacturingPlantName,
          );

        if (manufacturing) {
          manufacturingPlantIds.push(manufacturing.id);
        }
      }
    }

    return this.processesRepository.find({
      where: {
        isActive: true,
        ...(name && { name: ILike(`%${name}%`) }),
        ...(manufacturingPlantIds.length && {
          manufacturingPlant: { id: In(manufacturingPlantIds) },
        }),
      },
      relations: ['manufacturingPlant'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number, isActive = true): Promise<Processes> {
    const processes = await this.processesRepository.findOne({
      where: {
        id,
        ...(isActive && { isActive }),
      },
      relations: ['manufacturingPlant'],
    });

    if (!processes) {
      throw new NotFoundException(`Planta con ID ${id} no encontrado`);
    }

    return processes;
  }

  async findAllByManufacturingPlantNames(
    names: string[],
  ): Promise<Processes[]> {
    const Processes = [];

    for (let i = 0; i < names.length; i++) {
      const [manufacturingPlantName, processesName] = names[i].split(' - ');
      const process = await this.processesRepository.findOne({
        where: {
          name: processesName,
          isActive: true,
          manufacturingPlant: {
            name: manufacturingPlantName,
            isActive: true,
          },
        },
      });

      if (process) {
        Processes.push(process);
      }
    }

    return Processes;
  }

  async update(
    id: number,
    updateProcessesDto: UpdateProcessesDto,
  ): Promise<Processes> {
    await this.findOne(id);

    const manufacturingPlant = await this.manufacturingPlantsService.findOne(
      updateProcessesDto.manufacturingPlantId,
    );

    const process = await this.processesRepository.preload({
      id,
      ...updateProcessesDto,
      manufacturingPlant,
    });

    return this.processesRepository.save(process);
  }

  async remove(id: number): Promise<Processes> {
    await this.findOne(id);

    await this.processesRepository.update(id, {
      isActive: false,
    });

    return this.processesRepository.findOne({
      where: {
        id,
        isActive: false,
      },
    });
  }
}
