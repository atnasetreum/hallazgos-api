import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';
import { FindOptionsWhere, In, Repository } from 'typeorm';

import {
  CommentEvidenceDto,
  CreateEvidenceDto,
  QueryEvidenceDto,
  UpdateEvidenceDto,
} from './dto';
import { REQUEST } from '@nestjs/core';
import { ManufacturingPlantsService } from 'manufacturing-plants/manufacturing-plants.service';
import { MainTypesService } from 'main-types/main-types.service';
import { SecondaryTypesService } from 'secondary-types/secondary-types.service';
import { ZonesService } from 'zones/zones.service';
import { Evidence } from './entities/evidence.entity';
import { UsersService } from 'users/users.service';
import { MailService } from 'mail/mail.service';
import { User } from 'users/entities/user.entity';
import { STATUS_CANCEL, STATUS_CLOSE, STATUS_OPEN } from '@shared/constants';
import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { Comment } from './entities/comments.entity';
import { ParamsArgs } from './inputs/args';

@Injectable()
export class EvidencesService {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
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

    const { id: userId } = this.request['user'] as User;

    const { originalname: imgEvidence } = file;

    const { manufacturingPlantId, typeHallazgo, type, zone, supervisor } =
      createEvidenceDto;

    const manufacturingPlant =
      await this.manufacturingPlantsService.findOne(manufacturingPlantId);

    const mainType = await this.mainTypesService.findOne(typeHallazgo);

    const secondaryType = await this.secondaryTypesService.findOne(type);

    const zoneRow = await this.zonesService.findOne(zone);

    const user = await this.usersService.findOne(userId);

    const supervisors = await this.usersService.findSupervisor({
      manufacturingPlantId: manufacturingPlant.id,
      zoneId: zone,
      supervisorId: supervisor,
    });

    if (!supervisors.length)
      throw new BadRequestException(
        `No se ha encontrado algun supervisor asignador para la planta ${manufacturingPlant.name}, zona ${zoneRow.name}`,
      );

    const evidenceCurrent = await this.evidenceRepository.save(
      this.evidenceRepository.create({
        imgEvidence,
        manufacturingPlant,
        mainType,
        secondaryType,
        zone: zoneRow,
        user,
        supervisors,
        status: STATUS_OPEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await this.notifyByEmail({
      manufacturingPlant,
      evidenceCurrent,
      type: 'create',
    });

    return 'ok';
  }

  async notifyByEmail({
    manufacturingPlant,
    evidenceCurrent,
    type,
  }: {
    manufacturingPlant: ManufacturingPlant;
    evidenceCurrent: Evidence;
    type: string;
  }) {
    const plantUsers = await this.usersService.findAllByPlant(
      manufacturingPlant.id,
    );

    if (!plantUsers.length) {
      throw new BadRequestException(
        `No se ha encontrado usuarios asignados para la planta ${manufacturingPlant.name}`,
      );
    }

    for (let i = 0; i < plantUsers.length; i++) {
      const userToSendEmail = plantUsers[i];

      switch (type) {
        case 'create':
          await this.mailService.sendCreate({
            user: userToSendEmail,
            evidenceCurrent,
          });
          break;
        case 'cancel':
          await this.mailService.sendCancel({
            user: userToSendEmail,
            evidenceCurrent,
          });
          break;
        case 'solution':
          await this.mailService.sendSolution({
            user: userToSendEmail,
            evidenceCurrent,
          });
          break;
      }
    }
  }

  async saveSolution(id: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se ha enviado ningún archivo');
    }

    const evidence = await this.findOne(id);

    const { originalname: imgSolution } = file;

    evidence.imgSolution = imgSolution;
    evidence.solutionDate = new Date();
    evidence.status = STATUS_CLOSE;

    const evidenceSolution = await this.evidenceRepository.save(evidence);

    const manufacturingPlant = await this.manufacturingPlantsService.findOne(
      evidenceSolution.manufacturingPlant.id,
    );

    await this.notifyByEmail({
      manufacturingPlant,
      evidenceCurrent: evidenceSolution,
      type: 'solution',
    });

    return evidenceSolution;
  }

  async addComment(id: number, comment: CommentEvidenceDto) {
    const evidence = await this.findOne(id);
    const user = this.request['user'] as User;

    const { comment: commentText } = comment;

    await this.commentRepository.save(
      this.commentRepository.create({
        user,
        comment: commentText,
        evidence,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await this.evidenceRepository.update(id, {
      updatedAt: new Date(),
    });

    return this.findOne(id);
  }

  async findAll(queryEvidenceDto: QueryEvidenceDto) {
    const { manufacturingPlants } = this.request['user'] as User;

    const { manufacturingPlantId, mainTypeId, secondaryType, zone, status } =
      queryEvidenceDto;

    const manufacturingPlantsIds = manufacturingPlantId
      ? [manufacturingPlantId]
      : manufacturingPlants.map((manufacturingPlant) => manufacturingPlant.id);

    if (!manufacturingPlantsIds.length)
      throw new BadRequestException('No se ha encontrado plantas asignadas');

    const evidences = await this.evidenceRepository.find({
      where: {
        manufacturingPlant: {
          isActive: true,
          id: In(manufacturingPlantsIds),
        },
        mainType: {
          isActive: true,
          ...(mainTypeId && { id: mainTypeId }),
        },
        secondaryType: {
          isActive: true,
          ...(secondaryType && { id: secondaryType }),
        },
        zone: {
          isActive: true,
          ...(zone && { id: zone }),
        },
        ...(status && { status }),
      },
      relations: [
        'manufacturingPlant',
        'mainType',
        'secondaryType',
        'zone',
        'user',
        'supervisors',
        'comments',
      ],
      order: {
        id: 'DESC',
      },
    });

    return evidences;
  }

  async findAllGraphql(paramsArgs: ParamsArgs): Promise<{
    data: Evidence[];
    count: number;
  }> {
    const {
      manufacturingPlantId,
      mainTypeId,
      secondaryTypeId,
      zoneId,
      limit,
      page,
      status,
    } = paramsArgs;

    const where: FindOptionsWhere<Evidence> = {
      isActive: true,
      ...(manufacturingPlantId && {
        manufacturingPlant: { id: manufacturingPlantId },
      }),
      ...(mainTypeId && { mainType: { id: mainTypeId } }),
      ...(secondaryTypeId && { secondaryType: { id: secondaryTypeId } }),
      ...(zoneId && { zone: { id: zoneId } }),
      ...(status && { status }),
    };

    const numRows = await this.evidenceRepository.count({
      where,
    });

    const limitNumber = Number(limit);

    const numPerPage = limitNumber;
    // const numPages = Math.ceil(numRows / numPerPage);
    const skip = (Number(page) - 1) * numPerPage;

    const evidences = await this.evidenceRepository.find({
      where,
      ...(limitNumber === -1 ? {} : { take: limitNumber }),
      ...(limitNumber === -1 ? {} : { skip }),
      relations: [
        'manufacturingPlant',
        'mainType',
        'secondaryType',
        'zone',
        'user',
        'supervisors',
        'comments',
      ],
      order: {
        id: 'DESC',
      },
    });

    return { data: evidences, count: numRows };
  }

  async findOne(id: number) {
    const evidence = await this.evidenceRepository.findOne({
      where: {
        id,
      },
      relations: [
        'manufacturingPlant',
        'mainType',
        'secondaryType',
        'zone',
        'user',
        'supervisors',
        'comments',
      ],
    });

    if (!evidence)
      throw new NotFoundException(`No se ha encontrado el hallazgo #${id}`);

    return evidence;
  }

  update(id: number, updateEvidenceDto: UpdateEvidenceDto) {
    return { id, updateEvidenceDto };
  }

  async remove(id: number) {
    const evidence = await this.findOne(id);
    await this.evidenceRepository.update(id, {
      isActive: false,
      status: STATUS_CANCEL,
      updatedAt: new Date(),
    });

    const manufacturingPlant = await this.manufacturingPlantsService.findOne(
      evidence.manufacturingPlant.id,
    );

    await this.notifyByEmail({
      manufacturingPlant,
      evidenceCurrent: evidence,
      type: 'cancel',
    });

    return evidence;
  }
}
