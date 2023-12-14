import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateMainTypeDto, UpdateMainTypeDto } from './dto';
import { MainType } from './entities/main-type.entity';

@Injectable()
export class MainTypesService {
  constructor(
    @InjectRepository(MainType)
    private readonly mainTypeRepository: Repository<MainType>,
  ) {}

  create(createMainTypeDto: CreateMainTypeDto) {
    return createMainTypeDto;
  }

  findAll() {
    return this.mainTypeRepository.find({
      where: {
        isActive: true,
      },
      relations: ['secondaryTypes'],
    });
  }

  findOne(id: number) {
    return this.mainTypeRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  update(id: number, updateMainTypeDto: UpdateMainTypeDto) {
    return {
      id,
      updateMainTypeDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} mainType`;
  }
}
