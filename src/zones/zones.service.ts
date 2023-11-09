import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Zone } from 'zones/entities/zone.entity';
import { CreateZoneDto, UpdateZoneDto } from './dto';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  create(createZoneDto: CreateZoneDto) {
    return createZoneDto;
  }

  findAll() {
    return this.zoneRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  findOne(id: number) {
    return this.zoneRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });
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
