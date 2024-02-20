import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateSecondaryTypeDto, UpdateSecondaryTypeDto } from './dto';
import { SecondaryType } from './entities/secondary-type.entity';

@Injectable()
export class SecondaryTypesService {
  constructor(
    @InjectRepository(SecondaryType)
    private readonly secondaryTypeRepository: Repository<SecondaryType>,
  ) {}

  create(createSecondaryTypeDto: CreateSecondaryTypeDto) {
    return createSecondaryTypeDto;
  }

  findAll() {
    return this.secondaryTypeRepository.find({
      where: { isActive: true },
      relations: ['mainType'],
      order: { name: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.secondaryTypeRepository.findOne({
      where: { id, isActive: true },
    });
  }

  findAllByManufacturingPlant(id: number) {
    return this.secondaryTypeRepository.find({
      where: { mainType: { id }, isActive: true },
      order: { name: 'ASC' },
    });
  }

  update(id: number, updateSecondaryTypeDto: UpdateSecondaryTypeDto) {
    return { id, updateSecondaryTypeDto };
  }

  remove(id: number) {
    return `This action removes a #${id} secondaryType`;
  }
}
