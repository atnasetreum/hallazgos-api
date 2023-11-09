import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';
import { Repository } from 'typeorm';

import { CreateEvidenceDto, UpdateEvidenceDto } from './dto';
import { REQUEST } from '@nestjs/core';
import { ManufacturingPlantsService } from 'manufacturing-plants/manufacturing-plants.service';
import { MainTypesService } from 'main-types/main-types.service';
import { SecondaryTypesService } from 'secondary-types/secondary-types.service';
import { ZonesService } from 'zones/zones.service';
import { Evidence } from './entities/evidence.entity';
import { UsersService } from 'users/users.service';

@Injectable()
export class EvidencesService {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @Inject(REQUEST) private readonly request: Request,
    private readonly manufacturingPlantsService: ManufacturingPlantsService,
    private readonly mainTypesService: MainTypesService,
    private readonly secondaryTypesService: SecondaryTypesService,
    private readonly zonesService: ZonesService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createEvidenceDto: CreateEvidenceDto,
    files: Array<Express.Multer.File>,
  ) {
    const userId = this.request['user'].userId as number;

    const { originalname: imgEvidence } = files.find((file) => {
      return file.originalname.includes('evidence');
    });

    const { originalname: imgSignature } = files.find((file) => {
      return file.originalname.includes('signature');
    });

    const { manufacturingPlantId, typeHallazgo, type, zone } =
      createEvidenceDto;

    const manufacturingPlant =
      await this.manufacturingPlantsService.findOne(manufacturingPlantId);

    const mainType = await this.mainTypesService.findOne(typeHallazgo);

    const secondaryType = await this.secondaryTypesService.findOne(type);

    const zoneRow = await this.zonesService.findOne(zone);

    const user = await this.usersService.findOne(userId);

    await this.evidenceRepository.save(
      this.evidenceRepository.create({
        imgEvidence,
        imgSignature,
        manufacturingPlant,
        mainType,
        secondaryType,
        zone: zoneRow,
        user,
      }),
    );

    return 'ok';
  }

  findAll() {
    return this.evidenceRepository.find({
      where: {
        isActive: true,
        manufacturingPlant: {
          isActive: true,
        },
        mainType: {
          isActive: true,
        },
        secondaryType: {
          isActive: true,
        },
        zone: {
          isActive: true,
        },
      },
      relations: ['manufacturingPlant', 'mainType', 'secondaryType', 'zone'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} evidence`;
  }

  update(id: number, updateEvidenceDto: UpdateEvidenceDto) {
    return { id, updateEvidenceDto };
  }

  remove(id: number) {
    return `This action removes a #${id} evidence`;
  }
}
