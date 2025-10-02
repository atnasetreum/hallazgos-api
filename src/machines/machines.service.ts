import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateMachineDto, UpdateMachineDto } from './dto';
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

  findAll() {
    return `This action returns all machines`;
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
