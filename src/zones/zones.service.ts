import { Injectable } from '@nestjs/common';

import { CreateZoneDto, UpdateZoneDto } from './dto';

@Injectable()
export class ZonesService {
  create(createZoneDto: CreateZoneDto) {
    return createZoneDto;
  }

  findAll() {
    return `This action returns all zones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zone`;
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    return {
      id,
      updateZoneDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} zone`;
  }
}
