import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import { MailService } from 'mail/mail.service';

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
    private readonly mailService: MailService,
  ) {}

  async create(
    createEvidenceDto: CreateEvidenceDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha enviado ningún archivo');
    }

    const userId = this.request['user'].userId as number;

    const { originalname: imgEvidence } = file;

    const { manufacturingPlantId, typeHallazgo, type, zone } =
      createEvidenceDto;

    const manufacturingPlant =
      await this.manufacturingPlantsService.findOne(manufacturingPlantId);

    const mainType = await this.mainTypesService.findOne(typeHallazgo);

    const secondaryType = await this.secondaryTypesService.findOne(type);

    const zoneRow = await this.zonesService.findOne(zone);

    const user = await this.usersService.findOne(userId);

    const evidenceCurrent = await this.evidenceRepository.save(
      this.evidenceRepository.create({
        imgEvidence,
        manufacturingPlant,
        mainType,
        secondaryType,
        zone: zoneRow,
        user,
      }),
    );

    const plantUsers =
      await this.usersService.findAllByPlant(manufacturingPlantId);

    if (!plantUsers.length) {
      throw new BadRequestException(
        `No se ha encontrado usuarios asignados para la planta ${manufacturingPlant.name}`,
      );
    }

    const responsible = await plantUsers.find(
      (user) => user.role === 'Supervisor',
    );

    if (!responsible)
      throw new BadRequestException(
        `No se ha encontrado un supervisor asignador para la planta ${manufacturingPlant.name}`,
      );

    for (let i = 0; i < plantUsers.length; i++) {
      const userToSendEmail = plantUsers[i];
      await this.mailService.sendCreate({
        user: userToSendEmail,
        evidenceCurrent,
        responsible,
      });
    }

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
      relations: [
        'manufacturingPlant',
        'mainType',
        'secondaryType',
        'zone',
        'user',
      ],
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
