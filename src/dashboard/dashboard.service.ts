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

  findManufacturingPlantsIdsCurrentUser() {
    const user = this.request['user'] as User;

    return user.manufacturingPlants.map(
      (manufacturingPlant) => manufacturingPlant.id,
    );
  }

  async findManufacturingPlantsWithEvidences() {
    const manufacturingPlantsIds = this.findManufacturingPlantsIdsCurrentUser();

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

  async findAllEvidencesByMonth(year: number) {
    const manager = this.manufacturingPlant.manager;

    const manufacturingPlantsIds = this.findManufacturingPlantsIdsCurrentUser();

    const whereDefault = `
      evidence."isActive" = TRUE 
      AND evidence.status != 'Cancelado' 
      AND date_part( 'year', evidence."createdAt" ) = ${year ?? "date_part('year', CURRENT_DATE)"}  
      AND evidence."manufacturingPlantId" in (${manufacturingPlantsIds.join(
        ',',
      )})
    `;

    const categories = await manager.query(`
      SELECT
        to_char( evidence."createdAt", 'Mon' ) AS mon 
      FROM
        evidence 
      WHERE
        ${whereDefault}
      GROUP BY
        mon 
      ORDER BY
        MIN ( evidence."createdAt" )
      ASC
    `);

    const manufacturingByMonth = [];

    for (const category of categories) {
      const data = await manager.query(`
        SELECT EXTRACT
          ( YEAR FROM evidence."createdAt" ) AS yyyy,
          to_char( evidence."createdAt", 'Mon' ) AS mon,
          manufacturing_plant."name",
          COUNT ( * ) AS total 
        FROM
          evidence
          INNER JOIN manufacturing_plant ON manufacturing_plant."id" = evidence."manufacturingPlantId" 
        WHERE
          ${whereDefault}
          AND to_char( evidence."createdAt", 'Mon' ) = '${category.mon}'
        GROUP BY
          1,
          2,
          evidence."manufacturingPlantId",
          manufacturing_plant."name" 
        ORDER BY
          MIN ( evidence."createdAt" ) ASC
      `);

      manufacturingByMonth.push(data);
    }

    const manufacturingPlants = [
      ...new Set(
        manufacturingByMonth.reduce((acc, item) => {
          const plants = item.map((item) => item.name);
          return [...acc, ...plants];
        }, []),
      ),
    ];

    const categoriesFormatted = categories.map((item) => item.mon);

    return {
      series: manufacturingPlants.map((plant) => {
        return {
          name: plant,
          data: categoriesFormatted.map((mon) => {
            const data = manufacturingByMonth.filter((item) => {
              return item.some((e) => e.mon === mon && e.name === plant);
            });

            if (data.length === 0) {
              return 0;
            }

            const currentData = data[0].find((item) => item.name === plant);

            return Number(currentData.total);
          }),
        };
      }),
      categories: categoriesFormatted,
    };
  }
}
