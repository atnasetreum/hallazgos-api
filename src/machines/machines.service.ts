import { Injectable } from '@nestjs/common';

import { CreateMachineDto, UpdateMachineDto } from './dto';

@Injectable()
export class MachinesService {
  create(createMachineDto: CreateMachineDto) {
    return createMachineDto;
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
