import { REQUEST } from '@nestjs/core';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';
import { In, Repository } from 'typeorm';
import * as moment from 'moment';

import { Evidence } from 'evidences/entities/evidence.entity';
import { User } from 'users/entities/user.entity';
import { STATUS_CLOSE } from '@shared/constants';

import 'moment/locale/es';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  get manufacturingPlants() {
    return (this.request['user'] as User).manufacturingPlants;
  }

  get manufacturingPlantsIds() {
    const manufacturingPlantsIds = this.manufacturingPlants.map(
      (manufacturingPlant) => manufacturingPlant.id,
    );

    if (!manufacturingPlantsIds.length)
      throw new BadRequestException('No se ha encontrado plantas asignadas');

    return manufacturingPlantsIds;
  }

  async findAllStatus() {
    const manufacturingPlantsIds = this.manufacturingPlantsIds;

    const evidences = await this.evidenceRepository.find({
      where: {
        manufacturingPlant: {
          isActive: true,
          id: In(manufacturingPlantsIds),
        },
      },
      relations: ['manufacturingPlant'],
    });

    const getEvidencesCurrent = (manufacturingPlantId: number) =>
      evidences.filter(
        (evidence) => evidence.manufacturingPlant.id === manufacturingPlantId,
      );

    const getDrilldownGroupedstatus = (manufacturingPlantId: number) => {
      const evidencesCurrent = getEvidencesCurrent(manufacturingPlantId);

      const status = evidencesCurrent.map((evidence) => evidence.status);

      const objStatusCounter = {};
      let total = 0;

      for (let i = 0, t = status.length; i < t; i++) {
        const statusCurrent = status[i];
        total += 1;
        if (!objStatusCounter[statusCurrent]) {
          objStatusCounter[statusCurrent] = 1;
        } else {
          objStatusCounter[statusCurrent] += 1;
        }
      }

      const array = [];
      const statusAdd = [];

      for (let i = 0, t = evidencesCurrent.length; i < t; i++) {
        const evicence = evidencesCurrent[i];
        const statusCurrent = evicence.status;
        if (!array[statusCurrent] && !statusAdd.includes(statusCurrent)) {
          array.push([
            statusCurrent,
            (objStatusCounter[statusCurrent] * 100) / total,
          ]);
          statusAdd.push(statusCurrent);
        }
      }

      return array;
    };

    const calculatePercentage = (manufacturingPlantId: number) => {
      const totalEvidences = evidences.length;
      const totalEvidencesCurrent =
        getEvidencesCurrent(manufacturingPlantId).length;
      const percentage = (totalEvidencesCurrent * 100) / totalEvidences;
      return percentage;
    };

    return {
      series: [
        {
          name: 'Plantas',
          colorByPoint: true,
          data: this.manufacturingPlants.map((manufacturingPlant) => ({
            name: manufacturingPlant.name,
            y: calculatePercentage(manufacturingPlant.id),
            drilldown: manufacturingPlant.name,
          })),
        },
      ],
      drilldown: {
        series: this.manufacturingPlants.map((manufacturingPlant) => ({
          name: manufacturingPlant.name,
          id: manufacturingPlant.name,
          data: getDrilldownGroupedstatus(manufacturingPlant.id),
        })),
      },
    };
  }

  async findRelevantData() {
    const manufacturingPlants = this.manufacturingPlants;

    const averageSolutionTime = (evidences: Evidence[]) => {
      let averageSolution = '';

      const arrayDurations = [];

      for (let i = 0; i < evidences.length; i++) {
        const evidence = evidences[i];
        const durantionToTime = moment.duration(
          moment(evidence.solutionDate).diff(moment(evidence.createdAt)),
        );

        arrayDurations.push(durantionToTime);
      }

      averageSolution = arrayDurations.length
        ? moment
            .duration(
              arrayDurations.reduce((a, b) => a + b) / arrayDurations.length,
            )
            .humanize()
        : '';

      return averageSolution;
    };

    const averageSolutionTimeByManufacturingPlant = {};

    for (let i = 0, t = manufacturingPlants.length; i < t; i++) {
      const manufacturingPlant = manufacturingPlants[i];
      const evidences = await this.evidenceRepository.find({
        where: {
          status: STATUS_CLOSE,
          manufacturingPlant: {
            isActive: true,
            id: manufacturingPlant.id,
          },
        },
      });

      averageSolutionTimeByManufacturingPlant[manufacturingPlant.name] =
        averageSolutionTime(evidences);
    }

    return { averageSolutionTimeByManufacturingPlant };
  }
}
