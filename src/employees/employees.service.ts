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

  async seed() {
    const cargos = [
      'Control de acceso - Recepción Fase 4',
      'Recepción fase 4',
      'Vestidor- Baño M fase 4',
      'Vestidor- Baño Contratistas fase 4',
      'Oficinas 2do piso',
      'Oficinas 3er piso',
      'Cafeteria',
      'Sala de capacitaciones',
      'Datacenter Fase 2',
      'Control de acceso Fase 1',
      'Recepción Fase 1',
      'Alfacer - Datacenter',
      'Consultorio SST',
      'Consultorio SST - Baño',
      'Bodega de elementos de protección personal',
      'Oficinas administrativas 1er piso Fase 1',
      'Vestidor - Baño Mujeres Fase 1',
      'Vestidor - Baño Hombres Fase 1',
      'Oficinas administrativas 2do piso Fase 1',
      'Oficinas administrativas 3er  piso Fase 1',
      'Oficinas administrativas 2do piso Fase 4',
      'Oficinas administrativas 3er piso Fase 4',
      'Oficinas 1er piso Fase 1',
      'Oficinas 1er  piso Fase 2',
      'Oficinas 1er  piso Fase 4',
      'Recepción Fase 4',
      'Sala de capacitaciones Fase 4',
      'Auditorio',
      'Área perimetral Hada international',
      'Baño Hombre',
      'Bodega de almacenamiento',
      'Caniles',
      'Cuarto de aseo',
      'Muelles',
      'Oficinas',
      'Vestier Mujer',
      'Vestier Hombre',
      'Recepción',
      'Area de alistamiento',
      'Area de baterias',
      'Area de devoluciones y PNC',
      'Area perimetral',
      'Cafetería',
      'Baño Mujer',
      'Alfacer - Área perimetral',
      'Alfacer - Bodega de almacenamiento',
      'Alfacer - Recepción',
      'Alfacer - Oficinas',
      'Alfacer - Baños Hombres',
      'Alfacer - Baños Mujeres',
      'Alfacer - Vestier Mujeres',
      'Alfacer - Vestier Hombres',
      'Alfacer - Muelles nacionales',
      'Alfacer - Muelles exportación',
      'Alfacer - Cuarto de conductores',
      'Alfacer - Cafetería',
      'Alfacer - Cuarto de aseo',
      'Alfacer - Área de alistamiento',
      'Bodega Mariana',
      'Axia',
      'Cold Process - Esclusa de ingreso',
      'Cold Process - Oficina',
      'Cold Process - Área de lavado',
      'Cold Process - Área de secado',
      'Cold Process - Área de curado',
      'Cold Process - Área de cortado',
      'Cold Process - Esclusa de personal',
      'Cold Process - Vestier Hombres',
      'Cold Process - Vestier Mujeres',
      'Cold Process - Baño Hombres',
      'Cold Process - Baño Mujeres',
      'Cold Process - Bodega',
      'Cold Process - Área perimetral',
      'Cold Process - Recepción',
      'Cold Process - Cuarto de almacenamiento de aceites',
      'Cold Process - Cabina de pesaje',
      'Cold Process - Mezclado',
      'Cold Process - Zona de empaque',
      'Cold Process - Área de dosificación de materia prima',
      'Planta de producción Hada Ecofire - iniciadores',
      'Ecofire - Esclusa de ingreso',
      'Ecofire - Preparación y prepesaje',
      'Ecofire - Área de empaque',
      'Ecofire - Cuarto de aseo',
      'Ecofire Iniciadores - Esclusa de personal',
      'Ecofire - Esclusa de materiales',
      'Ecofire Iniciadores - Esclusa de materiales',
      'Ecofire - Área de prepesaje',
      'Ecofire - Cuarto de aires',
      'Ecofire - Iniciadores',
      'Ecofire - Velas',
      'Ecofire - Velas artesanales',
      'PTAR',
      'Empaque manual fase 4',
      'Planta de Líquidos - Esclusa material 1er piso',
      'Planta de Líquidos - Esclusa material 2do piso',
      'Planta de Líquidos - Esclusa material 3er piso',
      'Planta de líquidos - Cuarto de soplado',
      'Planta tratamiento de agua',
      'Planta de Líquidos - Preparación Línea 1',
      'Planta de Líquidos - Preparación Línea 2',
      'Planta de Líquidos - Preparación Línea 3',
      'Planta de Líquidos - Preparación Línea 4',
      'Planta de Líquidos - Envasado Línea 1',
      'Planta de Líquidos - Envasado Línea 2',
      'Planta de Líquidos - Envasado Línea 3',
      'Planta de Líquidos - Envasado Línea 4',
      'Planta de Líquidos - Esclusa personal',
      'Almacén de repuestos',
      'Bodega almacenamiento Fase 1',
      'Bodega de almacenamiento Fase 2',
      'Bodega de almacenamiento - Oficinas',
      'Bodega almacenamiento - Cabina de muestreo',
      'Bodega almacenamiento - Cuarto de baterías Fase 2',
      'Bodega de Jabón Base',
      'Bodega de almacenamiento fase 4',
      'Bodega almacenamiento Fase 4',
      'Bodega almacenamiento - Cuarto de baterías Fase 4',
      'Torre de enfriamiento',
      'Cuarto de conductores',
      'Cuarto de lubricantes',
      'Subestación eléctrica - Piso 2',
      'Cuarto de troqueles',
      'Taller de automatización',
      'Taller de ingeniería eléctrica',
      'Taller de soldadura',
      'Subestación eléctrica',
      'Mezclado Fase 4',
      'Mezclado - Esclusa de personal Fase 1',
      'Mezclado - Esclusa de personal Fase 2',
      'Mezclado - Esclusa de personal Fase 4',
      'Mezclado Fase 1',
      'Mezclado Fase 2',
      'Mezclado Fase 4',
      'Mezclado - Área de documentación',
      'Mezclado - Área prepesaje materia prima Línea 1-2',
      'Mezclado - Almacenamiento materia prima Línea 2',
      'Mezclado - Almacenamiento materia prima Línea 1',
      'Mezclado - Almacenamiento materia prima prepesada Línea 3',
      'Mezclado - Área de almacenamiento materia prima Línea 4',
      'Mezclado - Área prepesaje materia prima Línea 3 y 4',
      'Mezclado - Área almacenamiento materia prima Línea 3',
      'Mezclado - Área almacenamiento materia prima prepesada Línea 4',
      'Mezclado - Área de premezclas Fase 1',
      'Mezclado - Área de lavado Fase 1',
      'Mezclado - Dispensación de materias primas líquidas Línea 4',
      'Mezclado - Almacenamiento de materias primas productos especiales',
      'Mezclado - Zona de pesaje Línea 5',
      'Mezclado - Área almacenamiento materia prima Línea 5',
      'Mezclado - Área almacenamiento materia prima prepesada Línea 5',
      'Mezclado - Almacenamiento materias primas prepesadas Línea 6',
      'Mezclado - Zona de pesaje Línea 7',
      'Mezclado - Almacenamiento materias primas prepesadas Línea 7',
      'Mezclado - Almacenamiento de materias primas Línea 6',
      'Mezclado - Cuarto de lavado Fase 2',
      'Mezclado - Área de premezclas Fase 2',
      'Mezclado - Almacenamiento materias primas prepesadas Línea 8',
      'Mezclado - Almacenamiento materias primas  Línea 8',
      'Mezclado - Área de prepesaje Línea 8 y 9',
      'Mezclado - Almacenamiento materias primas  Línea 9',
      'Mezclado - Dispensación de materias primas líquidas Línea 9',
      'Mezclado - Almacenamiento materias primas prepesadas Línea 10',
      'Mezclado - Área de prepesaje Línea 10',
      'Mezclado - Área de lavado Fase 4',
      'Mezclado - Dispensación de materias primas líquidas Línea 11',
      'Mezclado - Almacenamiento materias primas  Línea 11',
      'Mezclado - Área de prepesaje materia prima Línea 11 y 12',
      'Mezclado - Dispensación de materias primas líquidas Línea 12',
      'Mezclado - Almacenamiento materias primas  Línea 12',
      'Mezclado - Almacenamiento materias primas prepesadas Línea 12',
      'Mezclado - Cuarto de lavado Fase 4',
      'Mezclado - Dispensación de materias primas liquidas Línea 13',
      'Mezclado - Área de almacenamiento materias primas  Línea 13',
      'Mezclado - Área de prepesaje materia prima Línea 13',
      'Mezclado - Dispensación de materias primas liquidas Línea 14',
      'Mezclado - Área de almacenamiento materias primas  Línea 14',
      'Mezclado - Área de prepesaje materia prima Línea 14',
      'Patio de tanques recepción',
      'Saponificación',
      'Laboratorio de saponificación',
      'Secado',
      'Secado - Oficina',
      'Vestidor-Baño H fase 4',
      'Shut de basuras',
      'Cold Process - Casino',
      'Casino fase 1',
      'Casino Fase 4',
      'Vestidor - Baño Mujeres Fase 4',
      'Vestidor - Baño Hombres Fase 4',
      'Vestidor - Baño contratista Fase 4',
      'Bodega de útiles de aseo',
      'Planta de producción Acabado fase 4',
      'Area perimetral fase 4',
      'Planta de producción fase 4',
      'Control de acceso Fase 4',
      'Cuarto de lavado Fase 2',
      'Producción acabado Línea 1',
      'Producción acabado Línea 2',
      'Producción acabado Línea 3',
      'Producción acabado Línea 4',
      'Producción acabado Línea 5',
      'Producción acabado Línea 6',
      'Producción acabado Línea 7',
      'Producción acabado Línea 8',
      'Producción acabado Línea 9',
      'Producción acabado Línea 10',
      'Producción acabado Línea 11',
      'Producción acabado Línea 12',
      'Producción acabado Línea 13',
      'Producción acabado Línea 14',
      'Área de molino',
      'Almacenamiento de molido',
      'Centro de acopio',
      'Cuarto de contramuestra',
      'Cuarto de contra muestra',
      'PTAR - Laboratorio',
      'Cuartos de residuos peligrosos',
      'Centro de acopio',
      'Laboratorio de microbiología',
      'Laboratorio de Metrología',
      'Laboratorio de material de empaque',
      'Laboratorio de panel de olor',
      'Laboratorio físico-químico',
      'Laboratorio de innovación',
      'Laboratorio de análisis instrumental',
      'Cuarto técnico',
      'Oficinas 2do piso',
      'Maceraciones',
      'Oficinas 1er piso',
      'Llenadora',
      'Jabonería',
      'Comedor',
      'Vestidor H',
      'Vestidor M',
      'Almacen',
      'Ingenieria',
      'Calidad',
      'Estacionamiento',
      'Perfumeria',
      'Pasillo principal',
      'Piso 15 Sala Mec',
      'Piso 9 Café Magia',
      'Archivo Manizales',
      'Lote Persia',
      'Piso 15 Área administrativa',
      'Piso 15 Presidencia',
      'Piso 15 Recepción',
      'Piso 15 Sala Dans',
      'Piso 15 Terraza Encanto',
      'Piso 9 Recepción',
      'Piso 9 Sala Cristalino',
      'Piso 9 Sala de Juntas',
      'Piso 9 Sala Deseo',
      'Piso 9 Sala Heno de Pravia',
      'Archivos Versalles',
      'Piso 9 Sala Magia',
      'Piso 9 Área administrativa',
      'Laboratorio Innovación piso 14',
      'Laboratorio Innovación piso 9',
      'Caldera',
      'Comedor',
      'Jaboneria',
      'Pasillo gris',
      'Caseta 1',
      'Caseta 2',
      'Ingeniería',
      'Cuarto de compresores',
      'Estación eléctrica',
      'Maceraciones',
      'CCM',
      'Innovación',
      'Liquidos',
      'Vestidor H',
      'Oficina PB',
      'Almacen',
      'Estacionamiento',
      'Zona de carga',
      'Agua desionizada',
      'Oficinas PA',
      'Calidad',
      'Vestidor M',
      'Obra perfumería',
      'Perfumería',
    ];

    for (const cargo of cargos) {
      const noExits = await this.zoneRepository.findOne({
        where: { name: ILike(`%${cargo}%`) },
      });

      if (!noExits && noExits !== null) {
        console.log({ noExits });
        /* const position = this.employeePositionRepository.create({
          name: cargo,
          isActive: true,
        });

        await this.employeePositionRepository.save(position); */
      }
    }

    return { message: 'Seed completed successfully' };
  }

  async findCatalogs() {
    return {
      areas: await this.employeeAreaRepository.find({
        where: {
          isActive: true,
        },
        order: { name: 'ASC' },
      }),
      positions: await this.employeePositionRepository.find({
        where: {
          isActive: true,
        },
        order: { name: 'ASC' },
      }),
      genres: await this.genreRepository.find({
        where: {
          isActive: true,
        },
        order: { name: 'ASC' },
      }),
      manufacturingPlants: this.request['user']?.manufacturingPlants.sort(
        (a, b) => a.name.localeCompare(b.name),
      ),
    };
  }

  findAll(filtersEmployeeDto: FiltersEmployeeDto) {
    const { manufacturingPlants } = this.request['user'] as User;

    const where: FindOptionsWhere<Employee> = {
      isActive: true,
      manufacturingPlants: {
        id: In(manufacturingPlants.map((mp) => mp.id)),
      },
    };

    const { manufacturingPlantId = 0, name = '' } = filtersEmployeeDto;

    if (manufacturingPlantId) {
      where.manufacturingPlants = {
        id: manufacturingPlantId,
      };
    }

    if (name) {
      where.name = ILike(`%${name}%`);
    }

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
}
