import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository } from 'typeorm';

import { CreateMainTypeDto, QueryMainTypeDto, UpdateMainTypeDto } from './dto';
import { MainType } from './entities/main-type.entity';

@Injectable()
export class MainTypesService {
  constructor(
    @InjectRepository(MainType)
    private readonly mainTypeRepository: Repository<MainType>,
  ) {}

  async create(createMainTypeDto: CreateMainTypeDto): Promise<MainType> {
    const mainType = await this.mainTypeRepository.create(createMainTypeDto);

    return this.mainTypeRepository.save(mainType);
  }

  findAll(queryMainTypeDto: QueryMainTypeDto): Promise<MainType[]> {
    const { name } = queryMainTypeDto;

    return this.mainTypeRepository.find({
      where: {
        isActive: true,
        ...(name && { name: ILike(`%${name}%`) }),
      },
      relations: ['secondaryTypes'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number, isActive = true): Promise<MainType> {
    const mainType = await this.mainTypeRepository.findOne({
      where: {
        id,
        ...(isActive && { isActive }),
      },
      relations: ['secondaryTypes'],
    });

    if (!mainType) {
      throw new NotFoundException(`Criterio con ID ${id} no encontrado`);
    }

    return mainType;
  }

  async update(
    id: number,
    updateMainTypeDto: UpdateMainTypeDto,
  ): Promise<MainType> {
    await this.findOne(id);

    const manufacturingPlant = await this.mainTypeRepository.preload({
      id,
      ...updateMainTypeDto,
    });

    return this.mainTypeRepository.save(manufacturingPlant);
  }

  async remove(id: number): Promise<MainType> {
    await this.findOne(id);

    await this.mainTypeRepository.update(id, {
      isActive: false,
    });

    return this.mainTypeRepository.findOne({
      where: {
        id,
        isActive: false,
      },
    });
  }
}
