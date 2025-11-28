import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

import { Repository } from 'typeorm';

import { RulesOfLife } from 'rules-of-life/entities';
import { CreateIcsDto, UpdateIcsDto } from './dto';
import { User } from 'users/entities/user.entity';
import { Ics } from './entities/ics.entity';

@Injectable()
export class IcsService {
  private readonly relations: string[] = [
    'createdBy',
    'manufacturingPlant',
    'ruleOfLife',
    'standardOfBehavior',
    'areaOfBehavior',
    'employees',
  ];

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(Ics)
    private readonly icsRepository: Repository<Ics>,
    @InjectRepository(RulesOfLife)
    private readonly rulesOfLifeRepository: Repository<RulesOfLife>,
  ) {}

  create(createIcsDto: CreateIcsDto, file: Express.Multer.File) {
    const { id: createdBy } = this.request['user'] as User;

    const {
      description,
      manufacturingPlantId,
      numberPeopleObserved,
      ruleOfLifeId,
      standardOfBehaviorId,
      areaOfBehaviorId,
      employeesIds,
    } = createIcsDto;

    let imgEvidence = '';

    if (file) {
      imgEvidence = file.filename;
    }

    return this.icsRepository.save({
      description,
      numberPeopleObserved,
      icsPercentage: Number(
        ((employeesIds.length / numberPeopleObserved) * 100).toFixed(2),
      ),
      ruleOfLife: {
        id: ruleOfLifeId,
      },
      ...(standardOfBehaviorId && {
        standardOfBehavior: { id: standardOfBehaviorId },
      }),
      ...(areaOfBehaviorId && {
        areaOfBehavior: { id: areaOfBehaviorId },
      }),
      createdBy: {
        id: createdBy,
      },
      manufacturingPlant: {
        id: manufacturingPlantId,
      },
      imgEvidence,
      employees: employeesIds.map((id) => ({ id })),
    });
  }

  catalogs() {
    return this.rulesOfLifeRepository.find({
      relations: ['standards', 'standards.areas'],
      order: { order: 'ASC' },
    });
  }

  findAll() {
    return this.icsRepository.find({
      where: { isActive: true },
      relations: this.relations,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const ics = await this.icsRepository.findOne({
      where: { id, isActive: true },
      relations: this.relations,
    });

    if (!ics) {
      throw new NotFoundException(`Ics with id ${id} not found`);
    }

    return ics;
  }

  update(id: number, updateIcDto: UpdateIcsDto) {
    return { id, updateIcDto };
  }

  async remove(id: number) {
    const ics = await this.findOne(id);
    await this.icsRepository.update(id, {
      isActive: false,
      updatedAt: new Date(),
    });

    return ics;
  }
}
