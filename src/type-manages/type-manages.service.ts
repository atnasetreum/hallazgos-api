import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTypeManageDto, UpdateTypeManageDto } from './dto';
import { TypeManage } from './entities/type-manage.entity';

@Injectable()
export class TypeManagesService {
  constructor(
    @InjectRepository(TypeManage)
    private readonly typeManageRepository: Repository<TypeManage>,
  ) {}

  create(createTypeManageDto: CreateTypeManageDto) {
    return createTypeManageDto;
  }

  findAll() {
    return this.typeManageRepository.find({
      where: {
        isActive: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number, isActive = true) {
    const typeManage = await this.typeManageRepository.findOne({
      where: {
        id,
        ...(isActive && { isActive }),
      },
    });

    if (!typeManage) {
      throw new NotFoundException(`Planta con ID ${id} no encontrada`);
    }

    return typeManage;
  }

  update(id: number, updateTypeManageDto: UpdateTypeManageDto) {
    return {
      id,
      updateTypeManageDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} typeManage`;
  }
}
