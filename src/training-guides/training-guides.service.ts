import { Injectable, NotFoundException } from '@nestjs/common';
//import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { REQUEST } from '@nestjs/core';

import { In, Repository } from 'typeorm';
//import { Request } from 'express';

import {
  CreateTrainingGuideDto,
  SaveTrainingGuideEmployeeDto,
  SaveTrainingGuideEmployeeSignatureDto,
  UpdateTrainingGuideDto,
} from './dto';
import { Employee, EmployeePosition } from 'employees/entities';
import {
  TrainingGuide,
  TrainingGuideEmployee,
  TrainingGuideEmployeeEvaluation,
  TrainingGuideTopic,
} from './entities';

@Injectable()
export class TrainingGuidesService {
  private readonly relations: string[] = [
    'position',
    'topics',
    'areaManager',
    'humanResourceManager',
    'topics.responsibles',
  ];

  constructor(
    //@Inject(REQUEST) private readonly request: Request,
    @InjectRepository(TrainingGuide)
    private readonly trainingGuideRepository: Repository<TrainingGuide>,
    @InjectRepository(EmployeePosition)
    private readonly employeePositionRepository: Repository<EmployeePosition>,
    @InjectRepository(TrainingGuideTopic)
    private readonly trainingGuideTopicRepository: Repository<TrainingGuideTopic>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(TrainingGuideEmployee)
    private readonly trainingGuideEmployeeRepository: Repository<TrainingGuideEmployee>,
    @InjectRepository(TrainingGuideEmployeeEvaluation)
    private readonly trainingGuideEmployeeEvaluationRepository: Repository<TrainingGuideEmployeeEvaluation>,
  ) {}

  create(createTrainingGuideDto: CreateTrainingGuideDto) {
    return createTrainingGuideDto;
  }

  async saveTrainingGuideEmployee(
    saveTrainingGuideEmployeeDto: SaveTrainingGuideEmployeeDto,
  ) {
    const {
      startDate,
      positionId,
      employeeId,
      evaluations,
      areaTgeId,
      humanResourceTgeId,
    } = saveTrainingGuideEmployeeDto;

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId, isActive: true },
      relations: ['area'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    let trainingGuideEmployee =
      await this.trainingGuideEmployeeRepository.findOne({
        where: {
          user: { id: employeeId },
          position: { id: positionId },
          isActive: true,
        },
        relations: ['evaluations'],
      });

    if (!trainingGuideEmployee) {
      trainingGuideEmployee = await this.trainingGuideEmployeeRepository.save({
        startDate,
        user: { id: employeeId },
        position: { id: positionId },
        area: { id: employee.area.id },
        areaManager: { id: areaTgeId },
        humanResourceManager: { id: humanResourceTgeId },
        evaluations: [],
      });

      for (const evalDto of evaluations) {
        await this.trainingGuideEmployeeEvaluationRepository.save({
          evaluationDate: evalDto.date,
          evaluationValue: evalDto.evaluation,
          observations: evalDto.observations,
          topic: { id: evalDto.topicId },
          trainingGuideEmployee,
        });
      }
    } else {
      await this.trainingGuideEmployeeRepository.update(
        trainingGuideEmployee.id,
        {
          startDate,
        },
      );

      trainingGuideEmployee =
        await this.trainingGuideEmployeeRepository.findOne({
          where: { id: trainingGuideEmployee.id },
        });

      for (const evalDto of evaluations) {
        let evaluation =
          await this.trainingGuideEmployeeEvaluationRepository.findOne({
            where: {
              trainingGuideEmployee: { id: trainingGuideEmployee.id },
              topic: { id: evalDto.topicId },
              isActive: true,
            },
          });
        if (evaluation) {
          await this.trainingGuideEmployeeEvaluationRepository.update(
            evaluation.id,
            {
              evaluationDate: evalDto.date,
              evaluationValue: evalDto.evaluation,
              observations: evalDto.observations,
            },
          );
        } else {
          await this.trainingGuideEmployeeEvaluationRepository.save({
            evaluationDate: evalDto.date,
            evaluationValue: evalDto.evaluation,
            observations: evalDto.observations,
            topic: { id: evalDto.topicId },
            trainingGuideEmployee,
          });
        }
      }
    }

    return trainingGuideEmployee;
  }

  async saveTrainingGuideEmployeeSignature(
    id: number,
    saveTrainingGuideEmployeeSignatureDto: SaveTrainingGuideEmployeeSignatureDto,
  ) {
    const { userId, type, signature } = saveTrainingGuideEmployeeSignatureDto;

    userId;

    switch (type) {
      case 'user':
        await this.trainingGuideEmployeeRepository.update(
          { id, isActive: true },
          { signatureEmployee: signature, signatureEmployeeDate: new Date() },
        );
        break;
      case 'areaManager':
        await this.trainingGuideEmployeeRepository.update(
          { id, isActive: true },
          {
            signatureAreaManager: signature,
            signatureAreaManagerDate: new Date(),
          },
        );
        break;
      case 'humanResourceManager':
        await this.trainingGuideEmployeeRepository.update(
          { id, isActive: true },
          {
            signatureHumanResourceManager: signature,
            signatureHumanResourceManagerDate: new Date(),
          },
        );
        break;
    }

    return { message: 'Signature saved successfully' };
  }

  async findOneTrainingGuideEmployee(id: number) {
    const trainingGuideEmployee =
      await this.trainingGuideEmployeeRepository.findOne({
        where: { id, isActive: true },
        relations: [
          'user',
          'position',
          'area',
          'evaluations',
          'evaluations.topic',
          'evaluations.topic.responsibles',
          'areaManager',
          'humanResourceManager',
        ],
        order: {
          evaluations: { topic: { order: 'ASC' } },
        },
      });
    if (!trainingGuideEmployee) {
      throw new NotFoundException(
        `Training Guide Employee with ID ${id} not found`,
      );
    }
    return trainingGuideEmployee;
  }

  findAll() {
    return `This action returns all trainingGuides`;
  }

  async findOne(id: number) {
    const trainingGuide = await this.trainingGuideRepository.findOne({
      where: { id, isActive: true },
      relations: this.relations,
    });

    if (!trainingGuide) {
      throw new NotFoundException(`Training Guide with ID ${id} not found`);
    }

    return trainingGuide;
  }

  async findOneByPositionIdAndEmployeeId(
    positionId: number,
    employeeId: number,
  ) {
    const trainingGuideEmployee =
      await this.trainingGuideEmployeeRepository.findOne({
        where: {
          user: { id: employeeId, position: { id: positionId } },
          isActive: true,
        },
        relations: [
          'evaluations',
          'evaluations.topic',
          'areaManager',
          'humanResourceManager',
        ],
      });

    const trainingGuide = await this.trainingGuideRepository.findOne({
      where: { position: { id: positionId }, isActive: true },
      relations: this.relations,
      order: {
        topics: { order: 'ASC' },
      },
    });

    if (!trainingGuide) {
      throw new NotFoundException(
        `Training Guide for Position ID ${positionId} not found`,
      );
    }

    return { trainingGuide, trainingGuideEmployee };
  }

  update(id: number, updateTrainingGuideDto: UpdateTrainingGuideDto) {
    return { id, updateTrainingGuideDto };
  }

  remove(id: number) {
    return `This action removes a #${id} trainingGuide`;
  }

  async seed() {
    const data = [
      {
        responsible: [290],
        duration: 8,
        tema: 'Proceso Fabricación del jabón líquido/Solido/Hidroalcoholico Interactivo',
      },
      {
        responsible: [289],
        duration: 2,
        tema: 'Aspectos Seguridad Ocupacional: Levantamiento y movilización de cargas, Seguridad en la Exposición a Material Particulado, Seguridad en la Manipulación de Sustancias Químicas, Manejo de Equipos y Herramientas, Ruido, Almacenamiento y Bodegaje, Proyección de Partículas, Ergonomía Aplicada al Puesto de Trabajo',
      },
      {
        responsible: [254],
        duration: 1,
        tema: 'Generalidades de Control de Calidad',
      },
      {
        responsible: [254],
        duration: 1,
        tema: 'Generalidades de Microbiología',
      },
      {
        responsible: [260],
        duration: 1,
        tema: 'Generalidades de Buenas Prácticas de Manufactura',
      },
      { responsible: [254], duration: 1, tema: 'Defectología' },
      {
        responsible: [289],
        duration: 2,
        tema: 'Manejo seguro de sustancias químicas (Operación y Manejo de Sustancias Quimicas)',
      },
      {
        responsible: [289],
        duration: 1,
        tema: 'Uso y Manejo de Patrin Hidraulico',
      },
      {
        responsible: [260],
        duration: 1,
        tema: 'Sistema Integrado de Gestión',
      },
      {
        responsible: [260],
        duration: 2,
        tema: 'Manejo de Residuos',
      },
      {
        responsible: [289],
        duration: 1,
        tema: 'Manejo de Derrames',
      },
      {
        responsible: [269],
        duration: 1,
        tema: 'Limpieza y Sanitización',
      },
      {
        responsible: [260],
        duration: 1,
        tema: 'Buenas Practicas de Documentación',
      },
      {
        responsible: [276],
        duration: 1,
        tema: 'Manejo y disposición de residuos de Jabon',
      },
      {
        responsible: [288, 269],
        duration: 2,
        tema: 'Alistamiento de los materiales y operación de empaque bajo los estandares de calidad',
      },
      {
        responsible: [288, 269],
        duration: 2,
        tema: 'Manejo de Estibas y patron de arrume',
      },
      {
        responsible: [288, 269],
        duration: 1,
        tema: 'Manejo de maquina encintadora y funcionalidad para el sellado de cajas',
      },
      {
        responsible: [288, 269],
        duration: 1,
        tema: 'Principios y lineamientos para la correcta codificación e inspección de productos',
      },
    ];

    const themes = [...new Set(data.map((item) => item.tema))];

    for (const [idx, theme] of themes.entries()) {
      if (
        !(await this.trainingGuideTopicRepository.findOne({
          where: { name: theme },
        }))
      ) {
        const { responsible, duration } = data.find(
          (item) => item.tema === theme,
        );

        const responsibles = await this.employeeRepository.findBy({
          id: In(responsible),
        });

        const evaluationBoolean = [
          'Uso y Manejo de Patrin Hidraulico',
          'Manejo y disposición de residuos de Jabon',
          'Alistamiento de los materiales y operación de empaque bajo los estandares de calidad',
          'Manejo de Estibas y patron de arrume',
          'Manejo de maquina encintadora y funcionalidad para el sellado de cajas',
          'Principios y lineamientos para la correcta codificación e inspección de productos',
        ];

        await this.trainingGuideTopicRepository.save({
          name: theme,
          duration,
          responsibles,
          typeOfEvaluation: evaluationBoolean.includes(theme)
            ? 'boolean'
            : 'numeric',
          order: idx + 1,
        });
      } else {
        console.log(`El tema ${theme} ya existe`);
      }
    }

    const topics = await this.trainingGuideTopicRepository.find({});

    const position = await this.employeePositionRepository.findOne({
      where: { id: 8 },
    });

    const trainingGuide = await this.trainingGuideRepository.save({
      position,
      topics,
      areaManager: {
        id: 11,
      },
      humanResourceManager: {
        id: 19,
      },
    });

    return this.findOne(trainingGuide.id);
  }
}
