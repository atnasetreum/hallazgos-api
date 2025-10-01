import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

import { Repository } from 'typeorm';
import { Request } from 'express';

import { TypeOfInjury } from 'type-of-injuries/entities/type-of-injury.entity';
import { TypesOfEvent } from 'types-of-events/entities/types-of-event.entity';
import { CieDiagnosis } from 'cie-diagnoses/entities/cie-diagnosis.entity';
import { AtMechanism } from 'at-mechanisms/entities/at-mechanism.entity';
import { BodyPart } from 'body-parts/entities/body-part.entity';
import { CreateCiaelDto, UpdateCiaelDto } from './dto';
import { Zone } from 'zones/entities/zone.entity';
import { User } from 'users/entities/user.entity';
import { Ciael } from './entities/ciael.entity';
import { Employee } from 'employees/entities';
//import { calculateAge } from '@shared/utils';

@Injectable()
export class CiaelsService {
  private readonly relations = [
    'typeOfEvent',
    'createdBy',
    'employee',
    'employee.gender',
    'employee.position',
    'cieDiagnosis',
    'zone',
    'zone.area',
    'bodyPart',
    'atAgent',
    'typeOfInjury',
    'atMechanism',
  ];

  private readonly select = {
    id: true,
    description: true,
    eventDate: true,
    createdAt: true,
    daysOfDisability: true,
    typeOfEvent: { name: true },
    createdBy: { name: true },
    employee: {
      code: true,
      name: true,
      gender: { name: true },
      birthdate: true,
      position: { name: true },
    },
    cieDiagnosis: { name: true },
    zone: { name: true, area: { name: true } },
    bodyPart: { name: true },
    atAgent: { name: true },
    typeOfInjury: { name: true },
    atMechanism: { name: true },
  };

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(Ciael)
    private readonly ciaelRepository: Repository<Ciael>,
    @InjectRepository(TypesOfEvent)
    private readonly typesOfEventRepository: Repository<TypesOfEvent>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(CieDiagnosis)
    private readonly cieDiagnosisRepository: Repository<CieDiagnosis>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    @InjectRepository(BodyPart)
    private readonly bodyPartRepository: Repository<BodyPart>,
    @InjectRepository(TypeOfInjury)
    private readonly typeOfInjuryRepository: Repository<TypeOfInjury>,
    @InjectRepository(AtMechanism)
    private readonly atMechanismRepository: Repository<AtMechanism>,
  ) {}

  async create(createCiaelDto: CreateCiaelDto) {
    const createdBy = this.request['user'] as User;

    const {
      description,
      typeOfEventId,
      employeeId,
      eventDate,
      cieDiagnosisId,
      daysOfDisability,
      zoneId,
      bodyPartId,
      atAgentId,
      typeOfInjuryId,
      atMechanismId,
    } = createCiaelDto;

    const typeOfEvent = await this.typesOfEventRepository.findOne({
      where: { id: typeOfEventId, isActive: true },
    });

    if (!typeOfEvent) {
      throw new NotFoundException(
        `TypesOfEvent with id ${typeOfEventId} not found`,
      );
    }

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId, isActive: true },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const cieDiagnosis = await this.cieDiagnosisRepository.findOne({
      where: { id: cieDiagnosisId, isActive: true },
    });

    if (!cieDiagnosis) {
      throw new NotFoundException(
        `CieDiagnosis with id ${cieDiagnosisId} not found`,
      );
    }

    const zone = await this.zoneRepository.findOne({
      where: { id: zoneId, isActive: true },
    });

    if (!zone) {
      throw new NotFoundException(`Zone with id ${zoneId} not found`);
    }

    const bodyPart = await this.bodyPartRepository.findOne({
      where: { id: bodyPartId, isActive: true },
    });

    if (!bodyPart) {
      throw new NotFoundException(`BodyPart with id ${bodyPartId} not found`);
    }

    const atAgent = await this.bodyPartRepository.findOne({
      where: { id: atAgentId, isActive: true },
    });

    if (!atAgent) {
      throw new NotFoundException(`AtAgent with id ${atAgentId} not found`);
    }

    const typeOfInjury = await this.typeOfInjuryRepository.findOne({
      where: { id: typeOfInjuryId, isActive: true },
    });

    if (!typeOfInjury) {
      throw new NotFoundException(
        `TypeOfInjury with id ${typeOfInjuryId} not found`,
      );
    }

    const atMechanism = await this.atMechanismRepository.findOne({
      where: { id: atMechanismId, isActive: true },
    });

    if (!atMechanism) {
      throw new NotFoundException(
        `AtMechanism with id ${atMechanismId} not found`,
      );
    }

    const newCiael = await this.ciaelRepository.save({
      description,
      typeOfEvent,
      createdBy,
      employee,
      eventDate,
      cieDiagnosis,
      daysOfDisability,
      zone,
      bodyPart,
      atAgent,
      typeOfInjury,
      atMechanism,
    });

    const ciael = await this.ciaelRepository.findOne({
      where: { id: newCiael.id },
      select: this.select,
      relations: this.relations,
    });

    //ciael.employee['age'] = calculateAge(ciael.employee.birthdate);

    return ciael;
  }

  findAll() {
    return `This action returns all ciaels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ciael`;
  }

  update(id: number, updateCiaelDto: UpdateCiaelDto) {
    return { id, updateCiaelDto };
  }

  remove(id: number) {
    return `This action removes a #${id} ciael`;
  }
}
