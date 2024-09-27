import { REQUEST } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';
import { In, MoreThan, Repository } from 'typeorm';

import { User } from 'users/entities/user.entity';
import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { groupBy } from '@shared/utils';

import 'moment/locale/es';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ManufacturingPlant)
    private readonly manufacturingPlant: Repository<ManufacturingPlant>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findManufacturingPlantsWithEvidences() {
    const user = this.request['user'] as User;

    const manufacturingPlantsIds = user.manufacturingPlants.map(
      (manufacturingPlant) => manufacturingPlant.id,
    );

    const manufacturingPlantsWithEvidences = await this.manufacturingPlant.find(
      {
        where: {
          id: In(manufacturingPlantsIds),
          isActive: true,
          evidences: MoreThan(0),
        },
        relations: ['evidences', 'evidences.zone', 'evidences.mainType'],
        loadEagerRelations: true,
      },
    );

    return manufacturingPlantsWithEvidences;
  }

  async findAllStatus() {
    const manufacturingPlantsWithEvidences =
      await this.findManufacturingPlantsWithEvidences();

    const evidencesTotal = manufacturingPlantsWithEvidences.reduce(
      (acc, project) => acc + project.evidences.length,
      0,
    );

    const statusData = manufacturingPlantsWithEvidences.map((project) => {
      const porcentaje = Number(
        (project.evidences.length / evidencesTotal) * 100,
      );
      return {
        name: `${project.name} (${project.evidences.length})`,
        y: Number(porcentaje.toFixed(2)),
        drilldown: project.name,
      };
    });

    const statusSeries = [];

    for (let i = 0, t = manufacturingPlantsWithEvidences.length; i < t; i++) {
      const projectCurrent = manufacturingPlantsWithEvidences[i];

      const clientsGroupStatus = groupBy(projectCurrent.evidences, 'status');

      const data = [];

      for (const key in clientsGroupStatus) {
        const clients = clientsGroupStatus[key];
        const porcentaje = Number(
          (clients.length / projectCurrent.evidences.length) * 100,
        );
        data.push([
          `${key} (${clients.length})`,
          Number(porcentaje.toFixed(2)),
        ]);
      }

      statusSeries.push({
        name: `${projectCurrent.name}`,
        id: projectCurrent.name,
        data,
      });
    }

    return {
      statusData,
      statusSeries,
    };
  }

  async findAllZones() {
    const manufacturingPlantsWithEvidences =
      await this.findManufacturingPlantsWithEvidences();
    const evidencesTotal = manufacturingPlantsWithEvidences.reduce(
      (acc, project) => acc + project.evidences.length,
      0,
    );

    const statusData = manufacturingPlantsWithEvidences.map((project) => {
      const porcentaje = Number(
        (project.evidences.length / evidencesTotal) * 100,
      );
      return {
        name: `${project.name} (${project.evidences.length})`,
        y: Number(porcentaje.toFixed(2)),
        drilldown: project.name,
      };
    });

    const statusSeries = [];

    for (let i = 0, t = manufacturingPlantsWithEvidences.length; i < t; i++) {
      const projectCurrent = manufacturingPlantsWithEvidences[i];

      const evidencesArray = projectCurrent.evidences.map((item) => ({
        ...item,
        zoneName: item.zone.name,
      }));

      const clientsGroupStatus = groupBy(evidencesArray, 'zoneName');

      const data = [];

      for (const key in clientsGroupStatus) {
        const clients = clientsGroupStatus[key];
        const porcentaje = Number(
          (clients.length / projectCurrent.evidences.length) * 100,
        );
        data.push([
          `${key} (${clients.length})`,
          Number(porcentaje.toFixed(2)),
        ]);
      }

      statusSeries.push({
        name: `${projectCurrent.name}`,
        id: projectCurrent.name,
        data,
      });
    }

    return {
      statusData,
      statusSeries,
    };
  }

  async findAllMainTypes() {
    const manufacturingPlantsWithEvidences =
      await this.findManufacturingPlantsWithEvidences();

    const totalEvidences = manufacturingPlantsWithEvidences.reduce(
      (acc, project) => acc + project.evidences.length,
      0,
    );

    return {
      series: [
        {
          name: 'Plantas',
          colorByPoint: true,
          data: manufacturingPlantsWithEvidences.map((manufacturingPlant) => {
            const sizeCurrent = manufacturingPlant.evidences.length;

            const fullName = `${manufacturingPlant.name} (${sizeCurrent})`;

            return {
              name: fullName,
              y: Number(
                Number((sizeCurrent / totalEvidences) * 100).toFixed(2),
              ),
              drilldown: fullName,
            };
          }),
        },
      ],
      drilldown: {
        breadcrumbs: {
          position: {
            align: 'right',
          },
        },

        series: manufacturingPlantsWithEvidences.map((project) => {
          const evidencesArray = project.evidences.map((item) => ({
            ...item,
            mainTypeName: item.mainType.name,
          }));

          const clientsGroupStatus = groupBy(evidencesArray, 'mainTypeName');

          const data = [];

          for (const key in clientsGroupStatus) {
            const clients = clientsGroupStatus[key];
            const porcentaje = Number(
              (clients.length / project.evidences.length) * 100,
            );
            data.push([
              `${key} (${clients.length})`,
              Number(porcentaje.toFixed(2)),
            ]);
          }

          const fullName = `${project.name} (${project.evidences.length})`;

          return {
            name: `${project.name}`,
            id: fullName,
            data,
          };
        }),
      },
    };
  }
}
