import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { FindOptionsWhere, Repository } from 'typeorm';

import { CreateMachineDto, FiltersMachineDto, UpdateMachineDto } from './dto';
import { Machine } from './entities/machine.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  create(createMachineDto: CreateMachineDto) {
    return this.machineRepository.save(createMachineDto);
  }

  findAll(filtersMachineDto: FiltersMachineDto) {
    const where: FindOptionsWhere<Machine> = { isActive: true };

    if (filtersMachineDto.manufacturingPlantId) {
      where.manufacturingPlants = {
        id: filtersMachineDto.manufacturingPlantId,
      };
    }

    return this.machineRepository.find({ where });
  }
  findOne(id: number) {
    return `This action returns a #${id} machine`;
  }

  update(id: number, updateMachineDto: UpdateMachineDto) {
    return { id, updateMachineDto };
  }

  remove(id: number) {
    return `This action removes a #${id} machine`;
  }
}
