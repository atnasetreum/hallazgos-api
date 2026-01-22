import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

import { Repository, FindOptionsWhere, In, ILike } from 'typeorm';
import { Request } from 'express';

import { Employee, EmployeeArea, EmployeePosition } from './entities';
import { Genre } from 'genres/entities/genre.entity';
import { User } from 'users/entities/user.entity';
import {
  CreateEmployeeDto,
  FiltersEmployeeDto,
  UpdateEmployeeDto,
} from './dto';
import { Zone } from 'zones/entities/zone.entity';

@Injectable()
export class EmployeesService {
  private readonly relations = [
    'area',
    'position',
    'gender',
    'manufacturingPlants',
  ];

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    @InjectRepository(EmployeeArea)
    private readonly employeeAreaRepository: Repository<EmployeeArea>,
    @InjectRepository(EmployeePosition)
    private readonly employeePositionRepository: Repository<EmployeePosition>,
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  get areas() {
    return this.employeeAreaRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  get positions() {
    return this.employeePositionRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  get genres() {
    return this.genreRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  get manufacturingPlants() {
    return this.request['user']?.manufacturingPlants.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const {
      code,
      name,
      birthdate,
      dateOfAdmission,
      areaId,
      positionId,
      genderId,
      manufacturingPlantsIds,
    } = createEmployeeDto;

    const manufacturingPlants = this.request['user']?.manufacturingPlants;

    const area = await this.employeeAreaRepository.findOne({
      where: { id: areaId, isActive: true },
    });

    const position = await this.employeePositionRepository.findOne({
      where: { id: positionId, isActive: true },
    });

    const gender = await this.genreRepository.findOne({
      where: { id: genderId, isActive: true },
    });

    const employee = this.employeeRepository.create({
      code,
      name,
      birthdate,
      dateOfAdmission,
      area,
      position,
      gender,
      manufacturingPlants: manufacturingPlants.filter((mp) =>
        manufacturingPlantsIds.includes(mp.id),
      ),
    });
    await this.employeeRepository.save(employee);
    return employee;
  }

  async findCatalogs() {
    return {
      areas: await this.areas,
      positions: await this.positions,
      genres: await this.genres,
      manufacturingPlants: this.manufacturingPlants,
    };
  }

  findPositions() {
    return this.positions;
  }

  findAll(filtersEmployeeDto: FiltersEmployeeDto) {
    const { manufacturingPlants } = this.request['user'] as User;

    const where: FindOptionsWhere<Employee> = {
      isActive: true,
      manufacturingPlants: {
        id: In(manufacturingPlants.map((mp) => mp.id)),
      },
    };

    const {
      manufacturingPlantId = 0,
      name = '',
      positionId = 0,
      /* assignedUserId = 0, */
    } = filtersEmployeeDto;

    if (manufacturingPlantId) {
      where.manufacturingPlants = {
        id: manufacturingPlantId,
      };
    }

    if (positionId) {
      where.position = {
        id: positionId,
      };
    }

    if (name) {
      where.name = ILike(`%${name}%`);
    }

    /* if (assignedUserId) {
      where.trainingGuides = [
        {
          humanResourceManager: {
            id: assignedUserId,
          },
        },
        {
          areaManager: {
            id: assignedUserId,
          },
        },
      ];
    } */

    return this.employeeRepository.find({
      where,
      relations: this.relations,
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: {
        id,
        isActive: true,
      },
      relations: this.relations,
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    const {
      code,
      name,
      birthdate,
      dateOfAdmission,
      areaId,
      positionId,
      genderId,
      manufacturingPlantsIds,
    } = updateEmployeeDto;

    const manufacturingPlants = this.request['user']?.manufacturingPlants;

    const area = await this.employeeAreaRepository.findOne({
      where: { id: areaId, isActive: true },
    });

    const position = await this.employeePositionRepository.findOne({
      where: { id: positionId, isActive: true },
    });

    const gender = await this.genreRepository.findOne({
      where: { id: genderId, isActive: true },
    });

    console.log({
      birthdate,
    });

    Object.assign(employee, {
      code,
      name,
      birthdate,
      dateOfAdmission,
      area,
      position,
      gender,
      manufacturingPlants: manufacturingPlants.filter((mp) =>
        manufacturingPlantsIds.includes(mp.id),
      ),
    });

    return this.employeeRepository.save({ ...employee });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.employeeRepository.save({
      id,
      isActive: false,
    });
  }

  async seed() {
    this.zoneRepository;

    return { message: 'Seed completed successfully2' };
  }
}
