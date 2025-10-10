import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

import { Request } from 'express';
import { Repository } from 'typeorm';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { AccidentPosition } from 'accident-positions/entities/accident-position.entity';
import { AssociatedTask } from 'associated-tasks/entities/associated-task.entity';
import { NatureOfEvent } from 'nature-of-events/entities/nature-of-event.entity';
import { TypeOfInjury } from 'type-of-injuries/entities/type-of-injury.entity';
import { TypesOfEvent } from 'types-of-events/entities/types-of-event.entity';
import { CieDiagnosis } from 'cie-diagnoses/entities/cie-diagnosis.entity';
import { AtMechanism } from 'at-mechanisms/entities/at-mechanism.entity';
import { TypeOfLink } from 'type-of-links/entities/type-of-link.entity';
import { WorkingDay } from 'working-days/entities/working-day.entity';
import { RiskFactor } from 'risk-factors/entities/risk-factor.entity';
import { BodyPart } from 'body-parts/entities/body-part.entity';
import { AtAgent } from 'at-agents/entities/at-agent.entity';
import { Country } from 'countries/entities/country.entity';
import { Machine } from 'machines/entities/machine.entity';
import { CreateCiaelDto, UpdateCiaelDto } from './dto';
import { Genre } from 'genres/entities/genre.entity';
import { Zone } from 'zones/entities/zone.entity';
import { Area } from 'areas/entities/area.entity';
import { User } from 'users/entities/user.entity';
import { Ciael } from './entities/ciael.entity';
import { Employee } from 'employees/entities';

@Injectable()
export class CiaelsService {
  private readonly logger = new Logger(CiaelsService.name);
  private readonly relations = [
    'manufacturingPlant',
    'typeOfEvent',
    'createdBy',
    'employee',
    'employee.gender',
    'cieDiagnosis',
    'accidentPosition',
    'zone',
    'zone.area',
    'bodyPart',
    'atAgent',
    'typeOfInjury',
    'atMechanism',
    'workingDay',
    'typeOfLink',
    'machine',
    'associatedTask',
    'areaLeader',
    'riskFactor',
    'natureOfEvent',
    'manager',
  ];

  private readonly select = {
    id: true,
    description: true,
    eventDate: true,
    createdAt: true,
    daysOfDisability: true,
    manufacturingPlant: { name: true },
    typeOfEvent: { name: true },
    createdBy: { name: true },
    timeWorked: true,
    usualWork: true,
    isDeath: true,
    isInside: true,
    monthsOfSeniority: true,
    employee: {
      code: true,
      name: true,
      dateOfAdmission: true,
      gender: { name: true },
      birthdate: true,
    },
    cieDiagnosis: { name: true },
    accidentPosition: { name: true },
    zone: { name: true, area: { name: true } },
    bodyPart: { name: true },
    atAgent: { name: true },
    typeOfInjury: { name: true },
    atMechanism: { name: true },
    workingDay: { name: true },
    typeOfLink: { name: true },
    machine: { name: true },
    associatedTask: { name: true },
    areaLeader: { name: true },
    riskFactor: { name: true },
    natureOfEvent: { name: true },
    manager: { name: true },
  };

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(Ciael)
    private readonly ciaelRepository: Repository<Ciael>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(AtAgent)
    private readonly atAgentRepository: Repository<AtAgent>,
    @InjectRepository(ManufacturingPlant)
    private readonly manufacturingPlantRepository: Repository<ManufacturingPlant>,
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
    @InjectRepository(WorkingDay)
    private readonly workingDayRepository: Repository<WorkingDay>,
    @InjectRepository(TypeOfLink)
    private readonly typeOfLinkRepository: Repository<TypeOfLink>,
    @InjectRepository(AccidentPosition)
    private readonly accidentPositionRepository: Repository<AccidentPosition>,
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    @InjectRepository(AssociatedTask)
    private readonly associatedTaskRepository: Repository<AssociatedTask>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RiskFactor)
    private readonly riskFactorRepository: Repository<RiskFactor>,
    @InjectRepository(NatureOfEvent)
    private readonly natureOfEventRepository: Repository<NatureOfEvent>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async getPlantMx() {
    const manufacturingPlantMX = await this.manufacturingPlantRepository.find({
      where: { name: 'Tepotzotlán' },
    });
    return manufacturingPlantMX;
  }

  async create(createCiaelDto: CreateCiaelDto) {
    const createdBy = this.request['user'] as User;

    const {
      manufacturingPlantId,
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
      workingDayId,
      timeWorked,
      usualWork,
      typeOfLinkId,
      isDeath,
      accidentPositionId,
      machineId,
      machineName,
      isInside,
      associatedTaskId,
      areaLeaderId,
      riskFactorId,
      natureOfEventsId,
      managerId,
    } = createCiaelDto;

    if (!machineId && !machineName) {
      throw new NotFoundException(`Machine id or name is required`);
    }

    const manufacturingPlant = await this.manufacturingPlantRepository.findOne({
      where: { id: manufacturingPlantId, isActive: true },
    });

    if (!manufacturingPlant) {
      throw new NotFoundException(
        `ManufacturingPlant with id ${manufacturingPlantId} not found`,
      );
    }

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

    const workingDay = await this.workingDayRepository.findOne({
      where: { id: workingDayId, isActive: true },
    });

    if (!workingDay) {
      throw new NotFoundException(
        `WorkingDay with id ${workingDayId} not found`,
      );
    }

    const typeOfLink = await this.typeOfLinkRepository.findOne({
      where: { id: typeOfLinkId, isActive: true },
    });

    if (!typeOfLink) {
      throw new NotFoundException(
        `TypeOfLink with id ${typeOfLinkId} not found`,
      );
    }

    const accidentPosition = await this.accidentPositionRepository.findOne({
      where: { id: accidentPositionId, isActive: true },
    });

    if (!accidentPosition) {
      throw new NotFoundException(
        `AccidentPosition with id ${accidentPositionId} not found`,
      );
    }

    let machine: Machine;
    if (machineId) {
      machine = await this.machineRepository.findOne({
        where: { id: machineId, isActive: true },
      });
      if (!machine) {
        throw new NotFoundException(`Machine with id ${machineId} not found`);
      }
    } else if (machineName) {
      machine = await this.machineRepository.save({ name: machineName });
    }

    const associatedTask = await this.associatedTaskRepository.findOne({
      where: { id: associatedTaskId, isActive: true },
    });

    if (!associatedTask) {
      throw new NotFoundException(
        `AssociatedTask with id ${associatedTaskId} not found`,
      );
    }

    const areaLeader = await this.userRepository.findOne({
      where: { id: areaLeaderId, isActive: true },
    });

    if (!areaLeader) {
      throw new NotFoundException(
        `AreaLeader with id ${areaLeaderId} not found`,
      );
    }

    const riskFactor = await this.riskFactorRepository.findOne({
      where: { id: riskFactorId, isActive: true },
    });

    if (!riskFactor) {
      throw new NotFoundException(
        `RiskFactor with id ${riskFactorId} not found`,
      );
    }

    const natureOfEvent = await this.natureOfEventRepository.findOne({
      where: { id: natureOfEventsId, isActive: true },
    });

    if (!natureOfEvent) {
      throw new NotFoundException(
        `NatureOfEvent with id ${natureOfEventsId} not found`,
      );
    }

    let manager: User;
    if (managerId) {
      manager = await this.userRepository.findOne({
        where: { id: managerId, isActive: true },
      });

      if (!manager) {
        throw new NotFoundException(`Manager with id ${managerId} not found`);
      }
    }

    function getElapsedMonths(startDateStr) {
      const startDate = new Date(startDateStr);
      const currentDate = new Date();

      const yearsDifference =
        currentDate.getFullYear() - startDate.getFullYear();
      const monthsDifference = currentDate.getMonth() - startDate.getMonth();

      return yearsDifference * 12 + monthsDifference;
    }

    const monthsOfSeniority = employee.dateOfAdmission
      ? getElapsedMonths(employee.dateOfAdmission)
      : null;

    const newCiael = await this.ciaelRepository.save({
      manufacturingPlant,
      description,
      typeOfEvent,
      createdBy,
      employee,
      eventDate,
      cieDiagnosis,
      ...(daysOfDisability && { daysOfDisability }),
      zone,
      bodyPart,
      atAgent,
      typeOfInjury,
      atMechanism,
      workingDay,
      timeWorked,
      usualWork,
      typeOfLink,
      isDeath,
      accidentPosition,
      machine,
      isInside,
      monthsOfSeniority,
      associatedTask,
      areaLeader,
      riskFactor,
      natureOfEvent,
      ...(managerId && { manager }),
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
    return this.ciaelRepository.find({
      select: this.select,
      relations: this.relations,
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.ciaelRepository.findOne({
      where: { id },
      select: this.select,
      relations: this.relations,
    });
  }

  update(id: number, updateCiaelDto: UpdateCiaelDto) {
    return { id, updateCiaelDto };
  }

  remove(id: number) {
    return `This action removes a #${id} ciael`;
  }

  seedBodyParts() {
    const data = [
      'Cabeza',
      'Cuello',
      'Manos',
      'Miembros inferiores',
      'Miembros superiores',
      'Ojos',
      'Pies',
      'Tronco (Incluye espalda, médula espinal, columna vertebral, pelvis)',
    ];

    this.logger.log('Seeding body parts...');
    data.forEach(async (name) => {
      const bodyPart = this.bodyPartRepository.create({ name });
      await this.bodyPartRepository.save(bodyPart);
    });
    this.logger.log('Body parts seeded successfully.');
  }

  async seedAccidentPositions() {
    const mx = [
      'Operador general de empaque',
      'Operador ayudante de mezclado',
      'Operador de Empaque',
      'Operario de Acabado',
      'Operador general',
      'OPERADOR DE EMPAQUE - NIVEL 1',
      'Operador de Mantenimiento Mecanico',
      'Operario general',
      'Operador de acabado',
      'Jefe de Servicios Generales',
      'Operador logistico granel',
      'Operario de puesta a punto',
    ];

    const data = [
      ...mx,
      'Operador Saponificación',
      'Operario de Mantenimiento mecanico',
      'Operario Ayudante de Secado',
      'Operador de Secado',
      'Operario de mantenimiento electrico',
      'OPERARIO LOCATIVO DE INFRAESTRUCTURA',
      'Operario Mantenimiento Locativo',
      'Operario Mantenimiento Mecanico',
      'Operador de Secado N1',
    ];

    const plantMx = await this.getPlantMx();

    this.logger.log('Seeding accident positions...');
    data.forEach(async (name) => {
      const accidentPosition = this.accidentPositionRepository.create({
        name,
        ...(mx.includes(name) && {
          manufacturingPlants: plantMx,
        }),
      });
      await this.accidentPositionRepository.save(accidentPosition);
    });
    this.logger.log('Accident positions seeded successfully.');
  }

  async seedAreas() {
    const data = [
      'ADMINISTRATIVO',
      'Agua desionizada',
      'Almacen',
      'Caldera',
      'Calidad',
      'Caseta 1',
      'Caseta 2',
      'CCM',
      'Comedor',
      'Cuarto de compresores',
      'ECOFIRE',
      'EMPAQUE MANUAL',
      'Estación eléctrica',
      'Estacionamiento',
      'Ingeniería',
      'Innovación',
      'Jaboneria',
      'LIQUIDOS',
      'LOGISTICA BODEGA FASE 2',
      'Maceraciones',
      'MANTENIMIENTO',
      'MEZCLADO',
      'Obra perfumería',
      'Oficina PB',
      'Oficinas PA',
      'Pasillo gris',
      'PATIO TANQUE',
      'Perfumería',
      'SAPONIFICACION Y SECADO',
      'SERVICIOS GENERALES',
      'SOLIDOS',
      'TALLER DE MANTENIMIENTO',
      'Vestidor H',
      'Vestidor M',
      'Zona de carga',
    ];

    this.logger.log('Seeding areas...');
    data.forEach(async (name) => {
      const area = this.areaRepository.create({ name });
      await this.areaRepository.save(area);
    });
    this.logger.log('Areas seeded successfully.');

    const zonas = [
      { name: 'Caldera', plant: 'Tepotzotlán', area: 'Caldera' },
      { name: 'Comedor', plant: 'Tepotzotlán', area: 'Comedor' },
      { name: 'Jaboneria', plant: 'Tepotzotlán', area: 'Jaboneria' },
      { name: 'Pasillo gris', plant: 'Tepotzotlán', area: 'Pasillo gris' },
      { name: 'Caseta 1', plant: 'Tepotzotlán', area: 'Caseta 1' },
      { name: 'Caseta 2', plant: 'Tepotzotlán', area: 'Caseta 2' },
      { name: 'Ingeniería', plant: 'Tepotzotlán', area: 'Ingeniería' },
      {
        name: 'Cuarto de compresores',
        plant: 'Tepotzotlán',
        area: 'Cuarto de compresores',
      },
      {
        name: 'Estación eléctrica',
        plant: 'Tepotzotlán',
        area: 'Estación eléctrica',
      },
      { name: 'Maceraciones', plant: 'Tepotzotlán', area: 'Maceraciones' },
      { name: 'CCM', plant: 'Tepotzotlán', area: 'CCM' },
      { name: 'Innovación', plant: 'Tepotzotlán', area: 'Innovación' },
      { name: 'Liquidos', plant: 'Tepotzotlán', area: 'Liquidos' },
      { name: 'Vestidor H', plant: 'Tepotzotlán', area: 'Vestidor H' },
      { name: 'Oficina PB', plant: 'Tepotzotlán', area: 'Oficina PB' },
      { name: 'Almacen', plant: 'Tepotzotlán', area: 'Almacen' },
      {
        name: 'Estacionamiento',
        plant: 'Tepotzotlán',
        area: 'Estacionamiento',
      },
      { name: 'Zona de carga', plant: 'Tepotzotlán', area: 'Zona de carga' },
      {
        name: 'Agua desionizada',
        plant: 'Tepotzotlán',
        area: 'Agua desionizada',
      },
      { name: 'Oficinas PA', plant: 'Tepotzotlán', area: 'Oficinas PA' },
      { name: 'Calidad', plant: 'Tepotzotlán', area: 'Calidad' },
      { name: 'Vestidor M', plant: 'Tepotzotlán', area: 'Vestidor M' },
      {
        name: 'Obra perfumería',
        plant: 'Tepotzotlán',
        area: 'Obra perfumería',
      },
      { name: 'Perfumería', plant: 'Tepotzotlán', area: 'Perfumería' },
    ];

    this.logger.log('Updating zones...');
    for (const zona of zonas) {
      const plant = await this.manufacturingPlantRepository.findOne({
        where: { name: zona.plant },
      });
      const area = await this.areaRepository.findOne({
        where: { name: zona.area },
      });
      const zone = await this.zoneRepository.findOne({
        where: {
          name: zona.name,
          manufacturingPlant: {
            id: plant.id,
          },
        },
      });
      if (plant && area && zone) {
        zone.area = area;
        await this.zoneRepository.update(zone.id, zone);
      }
    }
    this.logger.log('Zones updated successfully.');
  }

  async seedAssociatedTasks() {
    const mx = ['Pesaje', 'Ingreso de materia prima', 'Muestreo'];

    const data = [
      ...mx,
      'Acabado',
      'Ajuste e intervención de máquina',
      'Alistamiento de insumos',
      'Armado de corrugado',
      'Armado de canasta con jabón',
      'Cierre de compresora',
      'Desmonte del cono de la compresora final',
      'Dosificación de fragancia',
      'Empaque de producto terminado',
      'Empaque de base en sacos',
      'Fabricación de empaque',
      'Fabricación de velas',
      'Fue reubicado en operador de acabado',
      'Inspección de productos en área de logística',
      'Limpieza de área',
      'Limpieza de ciclón de atomizador S6000',
      'Limpieza de tolva',
      'Limpieza y despeje de equipos',
      'Limpieza y despeje de área',
      'Movimiento y traslado de estiba',
      'Movimiento y traslado interno en planta',
      'Perforación de platina',
      'Prueba en área',
      'Preparación saponificación',
      'Reinado de base',
      'Revisión y manipulación de jabón defectuoso',
      'Sellado de paquetes de jabón',
      'Tránsito de planta',
      'Verificación de giro de bomba de soda cáustica',
    ];
    this.logger.log('Seeding associated tasks...');
    const manufacturingPlantMX = await this.getPlantMx();
    data.forEach(async (name) => {
      const associatedTask = this.associatedTaskRepository.create({
        name,
        ...(mx.includes(name) && {
          manufacturingPlants: manufacturingPlantMX,
        }),
      });
      await this.associatedTaskRepository.save(associatedTask);
    });
    this.logger.log('Associated tasks seeded successfully.');
  }

  seedAtAgents() {
    const data = [
      'Ambiente de trabajo (Incluye superficies de tránsito y de trabajo, muebles, tejados, en el exterior, interior o subterráneos)',
      'Herramientas, implementos o utensilios',
      'Máquinas y/o equipos',
      'Materiales o sustancias',
      'Medios de transporte',
      'Otros agentes no clasificados',
    ];
    this.logger.log('Seeding at agents...');
    data.forEach(async (name) => {
      const atAgent = this.atAgentRepository.create({ name });
      await this.atAgentRepository.save(atAgent);
    });
    this.logger.log('At agents seeded successfully.');
  }

  seedAtMechanisms() {
    const data = [
      'Atrapamientos',
      'Caída de objetos',
      'Caída de personas',
      'Exposición o contacto con sustancias nocivas o radiaciones o salpicaduras',
      'Exposición o contacto con temperatura extrema',
      'Golpes con o contra objetos',
      'Otro',
      'Pisadas, choques o golpes',
      'Sobreesfuerzo, esfuerzo excesivo o falso movimiento',
    ];
    this.logger.log('Seeding at mechanisms...');
    data.forEach(async (name) => {
      const atMechanism = this.atMechanismRepository.create({ name });
      await this.atMechanismRepository.save(atMechanism);
    });
    this.logger.log('At mechanisms seeded successfully.');
  }

  seedCieDiagnoses() {
    const data = [
      'Atrapamiento',
      'Cortes',
      'Cuerpo extraño en ojo',
      'Dolor de espalda (lumbago)',
      'Golpes',
      'Herida',
      'Irritación ocular',
      'Quemadura',
      'Torcedura',
    ];
    this.logger.log('Seeding CIE Diagnoses...');
    data.forEach(async (name) => {
      const event = this.cieDiagnosisRepository.create({ name });
      await this.cieDiagnosisRepository.save(event);
    });
    this.logger.log('CIE Diagnoses seeded successfully.');
  }

  seedCountries() {
    const data = ['México', 'Colombia'];
    this.logger.log('Seeding countries...');
    data.forEach(async (name) => {
      const event = this.countryRepository.create({ name });
      await this.countryRepository.save(event);
    });
    this.logger.log('Countries seeded successfully.');
  }

  seedGenres() {
    const data = ['Masculino', 'Femenino'];
    this.logger.log('Seeding genres...');
    data.forEach(async (name) => {
      const event = this.genreRepository.create({ name });
      await this.genreRepository.save(event);
    });
    this.logger.log('Genres seeded successfully.');
  }

  async seedMachines() {
    const mx = [
      'PKB',
      'Sacheteadora',
      '16 boquillas',
      '8 boquillas',
      'bossar',
      'troqueladora',
      'compresor 1',
      'compresor 2',
      'mezcladora',
      'encelofanadora',
      'horno',
      'etiquetadora',
      'encintadora',
      'codificadora',
      'taponadora',
      'hidrogeno',
    ];

    const data = [
      ...mx,
      'Banda Termoencogible',
      'Barra paletizadora',
      'Bomba de Soda caustica',
      'Carro dosificador de Parafina',
      'Ciclón S6000',
      'Compresora Final línea 8',
      'Compresora inicial LNA 14',
      'Cono de la compresora final',
      'Cosedora',
      'Estibas de madera',
      'Exacto',
      'Levantamiento de carga de cajas',
      'Llave 2 Pulgadas',
      'Paper Línea 9',
      'Perforadora Magnética',
      'Selladora manual',
      'Tolva compresora inicial',
      'Tubería de transporte de aceite',
      'Volumétrica 16 Boquillas',
    ];

    const plantMx = await this.getPlantMx();

    this.logger.log('Seeding machines...');
    data.forEach(async (name) => {
      const machine = this.machineRepository.create({
        name,
        ...(mx.includes(name) && {
          manufacturingPlants: plantMx,
        }),
      });
      await this.machineRepository.save(machine);
    });
    this.logger.log('Machines seeded successfully.');
  }

  seedNatureOfEvents() {
    const data = ['Acto inseguro', 'Condición insegura'];
    this.logger.log('Seeding nature of events...');
    data.forEach(async (name) => {
      const natureOfEvent = this.natureOfEventRepository.create({ name });
      await this.natureOfEventRepository.save(natureOfEvent);
    });
    this.logger.log('Nature of events seeded successfully.');
  }

  seedRiskFactors() {
    const data = [
      'Biomecánico',
      'Condiciones de seguridad (locativo)',
      'Condiciones de seguridad',
      'Físico',
      'Locativo',
      'Mecánico',
      'Químico',
    ];
    this.logger.log('Seeding risk factors...');
    data.forEach(async (name) => {
      const riskFactor = this.riskFactorRepository.create({ name });
      await this.riskFactorRepository.save(riskFactor);
    });
    this.logger.log('Risk factors seeded successfully.');
  }

  seedTypeOfInjuries() {
    const data = [
      'Conmoción o trauma interno',
      'Golpe, contusión o aplastamiento',
      'Herida',
      'Irritación',
      'Otro',
      'Quemadura',
      'Torcedura o esguince, desgarro muscular, hernia o laceración de tendón sin herida',
      'Trauma superficial',
    ];
    this.logger.log('Seeding type of injuries...');
    data.forEach(async (name) => {
      const typeOfInjury = this.typeOfInjuryRepository.create({ name });
      await this.typeOfInjuryRepository.save(typeOfInjury);
    });
    this.logger.log('Type of injuries seeded successfully.');
  }

  seedTypeOfLinks() {
    const data = ['Directo', 'Temporal'];
    this.logger.log('Seeding type of links...');
    data.forEach(async (name) => {
      const typeOfLink = this.typeOfLinkRepository.create({ name });
      await this.typeOfLinkRepository.save(typeOfLink);
    });
    this.logger.log('Type of links seeded successfully.');
  }

  seedTypesOfEvents() {
    const data = [
      'Accidente de trabajo',
      'Incidente de trabajo',
      'Enfermedad laboral',
    ];
    this.logger.log('Seeding types of events...');
    data.forEach(async (name) => {
      const event = this.typesOfEventRepository.create({ name });
      await this.typesOfEventRepository.save(event);
    });
    this.logger.log('Types of events seeded successfully.');
  }

  seedWorkingDays() {
    const data = ['Diurna', 'Nocturna', 'Mixta'];
    this.logger.log('Seeding working days...');
    data.forEach(async (name) => {
      const event = this.workingDayRepository.create({ name });
      await this.workingDayRepository.save(event);
    });
    this.logger.log('Working days seeded successfully.');
  }

  async seedEmployees() {
    const employees = await this.employeeRepository.find({
      relations: ['manufacturingPlants'],
    });
    const plantMx = await this.getPlantMx();
    this.logger.log('Seeding employees...');

    const data = [
      {
        code: 10001,
        nacimiento: '01/08/1972',
        ingreso: '01/12/2005',
        sex: 'M',
      },
      {
        code: 10002,
        nacimiento: '12/01/1978',
        ingreso: '03/04/2000',
        sex: 'F',
      },
      {
        code: 10003,
        nacimiento: '05/04/1968',
        ingreso: '24/04/2002',
        sex: 'F',
      },
      {
        code: 10004,
        nacimiento: '29/07/1976',
        ingreso: '10/01/2000',
        sex: 'M',
      },
      {
        code: 10005,
        nacimiento: '10/04/1974',
        ingreso: '02/05/1996',
        sex: 'F',
      },
      {
        code: 10007,
        nacimiento: '13/02/1967',
        ingreso: '17/01/2002',
        sex: 'F',
      },
      {
        code: 10011,
        nacimiento: '11/04/1977',
        ingreso: '31/08/2000',
        sex: 'F',
      },
      {
        code: 10016,
        nacimiento: '03/02/1977',
        ingreso: '03/01/2017',
        sex: 'F',
      },
      {
        code: 10025,
        nacimiento: '05/06/1982',
        ingreso: '03/01/2017',
        sex: 'F',
      },
      {
        code: 10027,
        nacimiento: '23/10/1972',
        ingreso: '20/10/2008',
        sex: 'M',
      },
      {
        code: 10028,
        nacimiento: '17/05/1970',
        ingreso: '04/01/2010',
        sex: 'F',
      },
      {
        code: 10029,
        nacimiento: '22/11/1977',
        ingreso: '04/01/2010',
        sex: 'F',
      },
      {
        code: 10033,
        nacimiento: '09/07/1973',
        ingreso: '04/01/2012',
        sex: 'F',
      },
      {
        code: 10055,
        nacimiento: '16/03/1975',
        ingreso: '06/03/2017',
        sex: 'F',
      },
      {
        code: 10059,
        nacimiento: '30/09/1975',
        ingreso: '14/03/2017',
        sex: 'F',
      },
      {
        code: 10067,
        nacimiento: '21/03/1976',
        ingreso: '03/01/2020',
        sex: 'F',
      },
      {
        code: 10088,
        nacimiento: '02/11/1972',
        ingreso: '03/01/2019',
        sex: 'F',
      },
      {
        code: 10112,
        nacimiento: '08/04/1978',
        ingreso: '03/01/2020',
        sex: 'F',
      },
      {
        code: 10121,
        nacimiento: '17/03/1978',
        ingreso: '26/04/2022',
        sex: 'F',
      },
      {
        code: 10144,
        nacimiento: '07/07/1987',
        ingreso: '03/01/2020',
        sex: 'F',
      },
      {
        code: 10151,
        nacimiento: '15/11/1967',
        ingreso: '03/01/2020',
        sex: 'F',
      },
      {
        code: 10157,
        nacimiento: '12/04/1962',
        ingreso: '03/01/2020',
        sex: 'M',
      },
      {
        code: 10165,
        nacimiento: '05/01/1971',
        ingreso: '17/06/2024',
        sex: 'M',
      },
      {
        code: 10184,
        nacimiento: '01/01/1984',
        ingreso: '01/10/2020',
        sex: 'F',
      },
      {
        code: 10196,
        nacimiento: '04/02/1997',
        ingreso: '02/12/2024',
        sex: 'F',
      },
      {
        code: 10208,
        nacimiento: '16/04/2002',
        ingreso: '10/11/2020',
        sex: 'M',
      },
      {
        code: 10217,
        nacimiento: '27/04/1978',
        ingreso: '23/03/2021',
        sex: 'F',
      },
      {
        code: 10218,
        nacimiento: '17/07/1973',
        ingreso: '23/03/2021',
        sex: 'F',
      },
      {
        code: 10222,
        nacimiento: '07/05/1989',
        ingreso: '29/04/2021',
        sex: 'F',
      },
      {
        code: 10225,
        nacimiento: '28/03/1981',
        ingreso: '19/05/2021',
        sex: 'F',
      },
      {
        code: 10228,
        nacimiento: '08/01/1978',
        ingreso: '05/06/2021',
        sex: 'F',
      },
      {
        code: 10233,
        nacimiento: '23/01/1971',
        ingreso: '17/06/2021',
        sex: 'F',
      },
      {
        code: 10235,
        nacimiento: '13/01/1969',
        ingreso: '17/06/2021',
        sex: 'F',
      },
      {
        code: 10237,
        nacimiento: '27/10/1980',
        ingreso: '21/06/2021',
        sex: 'F',
      },
      {
        code: 10240,
        nacimiento: '23/07/1981',
        ingreso: '23/06/2021',
        sex: 'F',
      },
      {
        code: 10256,
        nacimiento: '12/06/1997',
        ingreso: '20/07/2021',
        sex: 'F',
      },
      {
        code: 10266,
        nacimiento: '19/12/2002',
        ingreso: '04/10/2021',
        sex: 'F',
      },
      {
        code: 10272,
        nacimiento: '28/05/1979',
        ingreso: '03/11/2021',
        sex: 'F',
      },
      {
        code: 10284,
        nacimiento: '22/04/1975',
        ingreso: '12/01/2022',
        sex: 'F',
      },
      {
        code: 10285,
        nacimiento: '03/07/1991',
        ingreso: '13/01/2022',
        sex: 'F',
      },
      {
        code: 10298,
        nacimiento: '23/04/2003',
        ingreso: '21/01/2022',
        sex: 'M',
      },
      {
        code: 10304,
        nacimiento: '19/05/1974',
        ingreso: '14/02/2022',
        sex: 'F',
      },
      {
        code: 10305,
        nacimiento: '18/02/2001',
        ingreso: '17/02/2022',
        sex: 'F',
      },
      {
        code: 10316,
        nacimiento: '23/04/1988',
        ingreso: '03/03/2022',
        sex: 'F',
      },
      {
        code: 10318,
        nacimiento: '26/03/1970',
        ingreso: '03/03/2022',
        sex: 'F',
      },
      {
        code: 10319,
        nacimiento: '22/09/1974',
        ingreso: '04/03/2022',
        sex: 'F',
      },
      {
        code: 10339,
        nacimiento: '30/06/1984',
        ingreso: '15/03/2022',
        sex: 'M',
      },
      {
        code: 10340,
        nacimiento: '23/03/1991',
        ingreso: '15/03/2022',
        sex: 'F',
      },
      {
        code: 10342,
        nacimiento: '05/09/1991',
        ingreso: '15/03/2022',
        sex: 'F',
      },
      {
        code: 10343,
        nacimiento: '16/01/1977',
        ingreso: '01/03/2023',
        sex: 'F',
      },
      {
        code: 10345,
        nacimiento: '15/06/1989',
        ingreso: '15/03/2022',
        sex: 'F',
      },
      {
        code: 10351,
        nacimiento: '25/04/2001',
        ingreso: '24/03/2022',
        sex: 'M',
      },
      {
        code: 10363,
        nacimiento: '27/09/1985',
        ingreso: '19/04/2022',
        sex: 'F',
      },
      {
        code: 10364,
        nacimiento: '10/05/1975',
        ingreso: '20/04/2022',
        sex: 'M',
      },
      {
        code: 10367,
        nacimiento: '19/12/1990',
        ingreso: '26/04/2022',
        sex: 'F',
      },
      {
        code: 10369,
        nacimiento: '30/03/1987',
        ingreso: '28/04/2022',
        sex: 'M',
      },
      {
        code: 10385,
        nacimiento: '22/02/1986',
        ingreso: '18/09/2024',
        sex: 'F',
      },
      {
        code: 10389,
        nacimiento: '14/05/1972',
        ingreso: '16/05/2022',
        sex: 'F',
      },
      {
        code: 10391,
        nacimiento: '23/09/1973',
        ingreso: '16/05/2022',
        sex: 'F',
      },
      {
        code: 10396,
        nacimiento: '07/05/1995',
        ingreso: '30/05/2022',
        sex: 'F',
      },
      {
        code: 10397,
        nacimiento: '05/05/1991',
        ingreso: '01/06/2022',
        sex: 'M',
      },
      {
        code: 10399,
        nacimiento: '10/12/1996',
        ingreso: '13/06/2022',
        sex: 'F',
      },
      {
        code: 10412,
        nacimiento: '12/09/1979',
        ingreso: '20/06/2022',
        sex: 'F',
      },
      {
        code: 10415,
        nacimiento: '08/12/1991',
        ingreso: '20/06/2022',
        sex: 'F',
      },
      {
        code: 10426,
        nacimiento: '08/09/1995',
        ingreso: '19/10/2022',
        sex: 'F',
      },
      {
        code: 10431,
        nacimiento: '15/03/1993',
        ingreso: '16/11/2022',
        sex: 'F',
      },
      {
        code: 10434,
        nacimiento: '02/04/1977',
        ingreso: '23/11/2022',
        sex: 'F',
      },
      {
        code: 10437,
        nacimiento: '23/07/1975',
        ingreso: '30/11/2022',
        sex: 'F',
      },
      {
        code: 10446,
        nacimiento: '15/10/1968',
        ingreso: '07/12/2022',
        sex: 'F',
      },
      {
        code: 10450,
        nacimiento: '13/11/1979',
        ingreso: '04/01/2023',
        sex: 'F',
      },
      {
        code: 10454,
        nacimiento: '12/06/1964',
        ingreso: '04/01/2023',
        sex: 'F',
      },
      {
        code: 10457,
        nacimiento: '31/05/1979',
        ingreso: '04/01/2023',
        sex: 'F',
      },
      {
        code: 10463,
        nacimiento: '29/04/1968',
        ingreso: '04/01/2023',
        sex: 'F',
      },
      {
        code: 10472,
        nacimiento: '21/10/1988',
        ingreso: '18/09/2024',
        sex: 'F',
      },
      {
        code: 10473,
        nacimiento: '10/03/1987',
        ingreso: '11/01/2023',
        sex: 'F',
      },
      {
        code: 10474,
        nacimiento: '22/10/1974',
        ingreso: '11/01/2023',
        sex: 'F',
      },
      {
        code: 10476,
        nacimiento: '17/01/1984',
        ingreso: '11/01/2023',
        sex: 'F',
      },
      {
        code: 10477,
        nacimiento: '13/09/1988',
        ingreso: '11/01/2023',
        sex: 'F',
      },
      {
        code: 10478,
        nacimiento: '01/02/1975',
        ingreso: '11/01/2023',
        sex: 'F',
      },
      {
        code: 10479,
        nacimiento: '04/10/1987',
        ingreso: '11/01/2023',
        sex: 'F',
      },
      {
        code: 10489,
        nacimiento: '01/02/1982',
        ingreso: '18/01/2023',
        sex: 'F',
      },
      {
        code: 10490,
        nacimiento: '23/07/1979',
        ingreso: '18/01/2023',
        sex: 'F',
      },
      {
        code: 10491,
        nacimiento: '26/08/1993',
        ingreso: '18/09/2024',
        sex: 'F',
      },
      {
        code: 10492,
        nacimiento: '06/01/1989',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 10496,
        nacimiento: '31/12/1982',
        ingreso: '18/01/2023',
        sex: 'F',
      },
      {
        code: 10499,
        nacimiento: '01/09/1990',
        ingreso: '18/01/2023',
        sex: 'F',
      },
      {
        code: 10500,
        nacimiento: '16/08/1989',
        ingreso: '18/01/2023',
        sex: 'F',
      },
      {
        code: 10508,
        nacimiento: '02/05/1982',
        ingreso: '25/01/2023',
        sex: 'F',
      },
      {
        code: 10510,
        nacimiento: '10/03/1996',
        ingreso: '25/01/2023',
        sex: 'F',
      },
      {
        code: 10522,
        nacimiento: '15/09/1984',
        ingreso: '01/02/2023',
        sex: 'F',
      },
      {
        code: 10526,
        nacimiento: '29/09/1995',
        ingreso: '01/02/2023',
        sex: 'F',
      },
      {
        code: 10529,
        nacimiento: '06/06/1967',
        ingreso: '01/02/2023',
        sex: 'M',
      },
      {
        code: 10531,
        nacimiento: '06/12/1999',
        ingreso: '08/02/2023',
        sex: 'F',
      },
      {
        code: 10533,
        nacimiento: '23/05/1983',
        ingreso: '16/12/2024',
        sex: 'F',
      },
      {
        code: 10536,
        nacimiento: '06/07/1973',
        ingreso: '23/12/2024',
        sex: 'F',
      },
      {
        code: 10545,
        nacimiento: '30/08/1997',
        ingreso: '15/02/2023',
        sex: 'F',
      },
      {
        code: 10550,
        nacimiento: '08/03/1979',
        ingreso: '15/02/2023',
        sex: 'F',
      },
      {
        code: 10564,
        nacimiento: '12/02/1986',
        ingreso: '22/02/2023',
        sex: 'F',
      },
      {
        code: 10590,
        nacimiento: '28/04/1998',
        ingreso: '11/05/2023',
        sex: 'F',
      },
      {
        code: 10594,
        nacimiento: '13/03/1975',
        ingreso: '17/05/2023',
        sex: 'F',
      },
      {
        code: 10600,
        nacimiento: '20/03/1983',
        ingreso: '24/05/2023',
        sex: 'M',
      },
      {
        code: 10603,
        nacimiento: '16/10/1988',
        ingreso: '12/06/2023',
        sex: 'F',
      },
      {
        code: 10612,
        nacimiento: '15/02/1980',
        ingreso: '21/06/2023',
        sex: 'F',
      },
      {
        code: 10615,
        nacimiento: '14/09/1996',
        ingreso: '21/06/2023',
        sex: 'F',
      },
      {
        code: 10618,
        nacimiento: '20/09/1996',
        ingreso: '21/06/2023',
        sex: 'F',
      },
      {
        code: 10632,
        nacimiento: '31/12/1989',
        ingreso: '04/07/2023',
        sex: 'F',
      },
      {
        code: 10640,
        nacimiento: '30/08/1998',
        ingreso: '11/07/2023',
        sex: 'F',
      },
      {
        code: 10645,
        nacimiento: '15/05/1992',
        ingreso: '11/07/2023',
        sex: 'F',
      },
      {
        code: 10648,
        nacimiento: '29/12/1997',
        ingreso: '19/07/2023',
        sex: 'M',
      },
      {
        code: 10649,
        nacimiento: '11/05/1998',
        ingreso: '19/07/2023',
        sex: 'F',
      },
      {
        code: 10656,
        nacimiento: '10/08/1992',
        ingreso: '19/07/2023',
        sex: 'M',
      },
      {
        code: 10661,
        nacimiento: '08/09/1982',
        ingreso: '26/07/2023',
        sex: 'F',
      },
      {
        code: 10676,
        nacimiento: '29/05/1989',
        ingreso: '16/08/2023',
        sex: 'F',
      },
      {
        code: 10678,
        nacimiento: '18/03/1978',
        ingreso: '22/08/2023',
        sex: 'F',
      },
      {
        code: 10682,
        nacimiento: '21/06/1980',
        ingreso: '22/08/2023',
        sex: 'F',
      },
      {
        code: 10687,
        nacimiento: '18/07/2003',
        ingreso: '29/08/2023',
        sex: 'F',
      },
      {
        code: 10688,
        nacimiento: '23/12/2003',
        ingreso: '29/08/2023',
        sex: 'M',
      },
      {
        code: 10693,
        nacimiento: '17/08/1994',
        ingreso: '06/09/2023',
        sex: 'M',
      },
      {
        code: 10705,
        nacimiento: '23/12/1969',
        ingreso: '20/09/2023',
        sex: 'F',
      },
      {
        code: 10706,
        nacimiento: '08/04/1993',
        ingreso: '20/09/2023',
        sex: 'F',
      },
      {
        code: 10720,
        nacimiento: '22/01/1978',
        ingreso: '08/11/2023',
        sex: 'F',
      },
      {
        code: 10723,
        nacimiento: '14/07/1991',
        ingreso: '15/11/2023',
        sex: 'F',
      },
      {
        code: 10736,
        nacimiento: '04/05/1986',
        ingreso: '12/08/2024',
        sex: 'F',
      },
      {
        code: 10737,
        nacimiento: '02/04/1996',
        ingreso: '12/08/2024',
        sex: 'F',
      },
      {
        code: 10738,
        nacimiento: '03/03/1995',
        ingreso: '12/08/2024',
        sex: 'F',
      },
      {
        code: 10747,
        nacimiento: '11/09/1978',
        ingreso: '02/09/2024',
        sex: 'M',
      },
      {
        code: 10748,
        nacimiento: '20/10/2002',
        ingreso: '18/09/2024',
        sex: 'F',
      },
      {
        code: 10750,
        nacimiento: '29/09/1984',
        ingreso: '18/09/2024',
        sex: 'F',
      },
      {
        code: 10752,
        nacimiento: '31/07/1995',
        ingreso: '18/09/2024',
        sex: 'F',
      },
      {
        code: 10756,
        nacimiento: '22/07/2002',
        ingreso: '18/09/2024',
        sex: 'F',
      },
      {
        code: 10757,
        nacimiento: '29/10/1983',
        ingreso: '24/09/2024',
        sex: 'F',
      },
      {
        code: 10759,
        nacimiento: '10/04/1988',
        ingreso: '24/09/2024',
        sex: 'F',
      },
      {
        code: 10761,
        nacimiento: '29/12/1979',
        ingreso: '24/09/2024',
        sex: 'F',
      },
      {
        code: 10764,
        nacimiento: '09/04/1988',
        ingreso: '24/09/2024',
        sex: 'F',
      },
      {
        code: 10767,
        nacimiento: '20/09/1988',
        ingreso: '24/09/2024',
        sex: 'F',
      },
      {
        code: 10770,
        nacimiento: '23/01/1982',
        ingreso: '02/10/2024',
        sex: 'M',
      },
      {
        code: 10775,
        nacimiento: '31/01/1984',
        ingreso: '09/10/2024',
        sex: 'F',
      },
      {
        code: 10777,
        nacimiento: '01/10/1994',
        ingreso: '09/10/2024',
        sex: 'F',
      },
      {
        code: 10779,
        nacimiento: '23/05/1994',
        ingreso: '09/10/2024',
        sex: 'M',
      },
      {
        code: 10780,
        nacimiento: '04/12/2003',
        ingreso: '15/10/2024',
        sex: 'M',
      },
      {
        code: 10789,
        nacimiento: '22/04/2004',
        ingreso: '05/11/2024',
        sex: 'M',
      },
      {
        code: 10791,
        nacimiento: '29/04/1992',
        ingreso: '19/11/2024',
        sex: 'M',
      },
      {
        code: 10792,
        nacimiento: '16/03/1990',
        ingreso: '19/11/2024',
        sex: 'M',
      },
      {
        code: 10797,
        nacimiento: '27/11/1992',
        ingreso: '02/12/2024',
        sex: 'F',
      },
      {
        code: 10799,
        nacimiento: '26/04/1985',
        ingreso: '02/12/2024',
        sex: 'F',
      },
      {
        code: 10806,
        nacimiento: '27/03/2003',
        ingreso: '16/12/2024',
        sex: 'M',
      },
      {
        code: 10807,
        nacimiento: '01/03/2000',
        ingreso: '16/12/2024',
        sex: 'F',
      },
      {
        code: 10808,
        nacimiento: '21/06/1982',
        ingreso: '16/12/2024',
        sex: 'F',
      },
      {
        code: 10809,
        nacimiento: '06/08/1988',
        ingreso: '16/12/2024',
        sex: 'F',
      },
      {
        code: 10813,
        nacimiento: '13/11/1984',
        ingreso: '23/12/2024',
        sex: 'F',
      },
      {
        code: 10815,
        nacimiento: '16/02/1995',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10818,
        nacimiento: '11/11/1995',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10819,
        nacimiento: '17/07/2003',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10820,
        nacimiento: '17/09/1983',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10821,
        nacimiento: '14/04/2003',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10822,
        nacimiento: '01/01/2006',
        ingreso: '06/01/2025',
        sex: 'M',
      },
      {
        code: 10823,
        nacimiento: '30/04/1988',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10825,
        nacimiento: '19/11/1992',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10827,
        nacimiento: '19/04/2003',
        ingreso: '06/01/2025',
        sex: 'F',
      },
      {
        code: 10831,
        nacimiento: '14/04/1979',
        ingreso: '13/01/2025',
        sex: 'F',
      },
      {
        code: 10832,
        nacimiento: '18/11/1995',
        ingreso: '13/01/2025',
        sex: 'F',
      },
      {
        code: 10837,
        nacimiento: '26/09/1985',
        ingreso: '13/01/2025',
        sex: 'F',
      },
      {
        code: 10840,
        nacimiento: '02/07/1981',
        ingreso: '13/01/2025',
        sex: 'F',
      },
      {
        code: 10844,
        nacimiento: '08/05/1985',
        ingreso: '13/01/2025',
        sex: 'F',
      },
      {
        code: 10848,
        nacimiento: '03/11/1985',
        ingreso: '27/01/2025',
        sex: 'F',
      },
      {
        code: 10850,
        nacimiento: '30/06/1986',
        ingreso: '27/01/2025',
        sex: 'F',
      },
      {
        code: 10851,
        nacimiento: '07/12/1984',
        ingreso: '27/01/2025',
        sex: 'F',
      },
      {
        code: 10860,
        nacimiento: '21/10/1983',
        ingreso: '25/02/2025',
        sex: 'F',
      },
      {
        code: 10861,
        nacimiento: '10/11/1979',
        ingreso: '25/02/2025',
        sex: 'M',
      },
      {
        code: 10863,
        nacimiento: '26/11/1988',
        ingreso: '25/02/2025',
        sex: 'F',
      },
      {
        code: 10866,
        nacimiento: '14/06/2003',
        ingreso: '25/02/2025',
        sex: 'F',
      },
      {
        code: 10869,
        nacimiento: '21/04/1988',
        ingreso: '11/03/2025',
        sex: 'F',
      },
      {
        code: 10870,
        nacimiento: '13/07/1990',
        ingreso: '11/03/2025',
        sex: 'F',
      },
      {
        code: 10871,
        nacimiento: '18/12/1995',
        ingreso: '11/03/2025',
        sex: 'M',
      },
      {
        code: 10872,
        nacimiento: '15/07/1979',
        ingreso: '11/03/2025',
        sex: 'M',
      },
      {
        code: 10874,
        nacimiento: '03/07/1985',
        ingreso: '25/03/2025',
        sex: 'F',
      },
      {
        code: 10875,
        nacimiento: '12/04/2005',
        ingreso: '25/03/2025',
        sex: 'M',
      },
      {
        code: 10876,
        nacimiento: '07/12/2004',
        ingreso: '21/04/2025',
        sex: 'M',
      },
      {
        code: 10878,
        nacimiento: '31/01/1993',
        ingreso: '21/04/2025',
        sex: 'M',
      },
      {
        code: 10879,
        nacimiento: '16/11/1998',
        ingreso: '28/04/2025',
        sex: 'M',
      },
      {
        code: 10883,
        nacimiento: '09/05/1982',
        ingreso: '06/05/2025',
        sex: 'F',
      },
      {
        code: 10884,
        nacimiento: '24/10/1994',
        ingreso: '06/05/2025',
        sex: 'F',
      },
      {
        code: 10885,
        nacimiento: '13/09/1987',
        ingreso: '06/05/2025',
        sex: 'F',
      },
      {
        code: 10888,
        nacimiento: '18/11/1991',
        ingreso: '06/05/2025',
        sex: 'M',
      },
      {
        code: 10892,
        nacimiento: '16/03/1998',
        ingreso: '13/05/2025',
        sex: 'M',
      },
      {
        code: 10894,
        nacimiento: '07/06/1996',
        ingreso: '10/06/2025',
        sex: 'M',
      },
      {
        code: 10895,
        nacimiento: '14/08/1988',
        ingreso: '10/06/2025',
        sex: 'M',
      },
      {
        code: 10897,
        nacimiento: '18/04/1992',
        ingreso: '17/06/2025',
        sex: 'F',
      },
      {
        code: 10898,
        nacimiento: '08/06/1993',
        ingreso: '17/06/2025',
        sex: 'F',
      },
      {
        code: 10899,
        nacimiento: '06/08/1985',
        ingreso: '17/06/2025',
        sex: 'F',
      },
      {
        code: 10900,
        nacimiento: '12/09/1985',
        ingreso: '17/06/2025',
        sex: 'F',
      },
      {
        code: 10902,
        nacimiento: '19/11/2003',
        ingreso: '17/06/2025',
        sex: 'F',
      },
      {
        code: 10904,
        nacimiento: '03/03/1988',
        ingreso: '24/06/2025',
        sex: 'F',
      },
      {
        code: 10905,
        nacimiento: '22/08/1997',
        ingreso: '24/06/2025',
        sex: 'F',
      },
      {
        code: 10906,
        nacimiento: '25/11/1994',
        ingreso: '24/06/2025',
        sex: 'F',
      },
      {
        code: 10907,
        nacimiento: '08/02/1983',
        ingreso: '24/06/2025',
        sex: 'F',
      },
      {
        code: 10910,
        nacimiento: '28/06/1982',
        ingreso: '08/07/2025',
        sex: 'F',
      },
      {
        code: 10911,
        nacimiento: '08/10/1999',
        ingreso: '08/07/2025',
        sex: 'F',
      },
      {
        code: 10913,
        nacimiento: '19/04/1981',
        ingreso: '08/07/2025',
        sex: 'M',
      },
      {
        code: 10914,
        nacimiento: '01/01/1984',
        ingreso: '08/07/2025',
        sex: 'F',
      },
      {
        code: 10915,
        nacimiento: '04/08/1987',
        ingreso: '15/07/2025',
        sex: 'F',
      },
      {
        code: 10916,
        nacimiento: '24/03/1984',
        ingreso: '15/07/2025',
        sex: 'F',
      },
      {
        code: 10917,
        nacimiento: '19/02/1990',
        ingreso: '15/07/2025',
        sex: 'F',
      },
      {
        code: 10920,
        nacimiento: '22/06/2002',
        ingreso: '22/07/2025',
        sex: 'M',
      },
      {
        code: 10923,
        nacimiento: '26/11/1997',
        ingreso: '22/07/2025',
        sex: 'M',
      },
      {
        code: 10925,
        nacimiento: '25/03/2002',
        ingreso: '22/07/2025',
        sex: 'M',
      },
      {
        code: 10927,
        nacimiento: '17/04/2003',
        ingreso: '29/07/2025',
        sex: 'F',
      },
      {
        code: 10929,
        nacimiento: '06/06/1984',
        ingreso: '29/07/2025',
        sex: 'F',
      },
      {
        code: 10933,
        nacimiento: '07/11/1991',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10935,
        nacimiento: '03/11/2003',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10936,
        nacimiento: '05/08/1996',
        ingreso: '05/08/2025',
        sex: 'M',
      },
      {
        code: 10938,
        nacimiento: '25/09/1995',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10939,
        nacimiento: '06/03/1982',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10941,
        nacimiento: '13/05/1990',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10943,
        nacimiento: '28/09/1996',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10945,
        nacimiento: '16/02/1995',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10946,
        nacimiento: '11/09/1979',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10947,
        nacimiento: '29/07/1996',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10948,
        nacimiento: '30/05/1993',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10950,
        nacimiento: '23/02/2003',
        ingreso: '05/08/2025',
        sex: 'M',
      },
      {
        code: 10951,
        nacimiento: '08/02/1983',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10953,
        nacimiento: '24/07/1989',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10954,
        nacimiento: '03/08/1989',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10955,
        nacimiento: '28/01/1991',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10959,
        nacimiento: '27/05/2006',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10960,
        nacimiento: '22/11/2000',
        ingreso: '05/08/2025',
        sex: 'F',
      },
      {
        code: 10963,
        nacimiento: '14/12/1984',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10964,
        nacimiento: '26/05/1996',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10965,
        nacimiento: '26/04/1993',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10966,
        nacimiento: '12/05/1980',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10967,
        nacimiento: '09/02/1999',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10968,
        nacimiento: '18/05/1994',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10969,
        nacimiento: '05/05/1995',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10970,
        nacimiento: '16/03/1991',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10971,
        nacimiento: '22/05/1996',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10972,
        nacimiento: '04/03/1990',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10973,
        nacimiento: '18/03/1994',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10974,
        nacimiento: '11/09/1996',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10975,
        nacimiento: '07/02/1982',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10977,
        nacimiento: '08/01/1988',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10978,
        nacimiento: '18/12/1997',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10979,
        nacimiento: '19/11/1989',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10980,
        nacimiento: '24/03/2003',
        ingreso: '19/08/2025',
        sex: 'F',
      },
      {
        code: 10981,
        nacimiento: '22/07/2004',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10982,
        nacimiento: '21/01/1986',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10983,
        nacimiento: '24/04/1992',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10984,
        nacimiento: '19/06/1992',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10985,
        nacimiento: '29/11/1981',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10986,
        nacimiento: '09/03/1980',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10987,
        nacimiento: '20/10/2002',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 10988,
        nacimiento: '03/05/1995',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 10989,
        nacimiento: '19/06/1994',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 10991,
        nacimiento: '17/04/1997',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 10993,
        nacimiento: '10/10/1990',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 10994,
        nacimiento: '22/12/1988',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 10995,
        nacimiento: '26/07/1993',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 10996,
        nacimiento: '21/09/1996',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 10998,
        nacimiento: '22/04/1995',
        ingreso: '26/08/2025',
        sex: 'M',
      },
      {
        code: 10999,
        nacimiento: '09/12/2001',
        ingreso: '26/08/2025',
        sex: 'M',
      },
      {
        code: 11000,
        nacimiento: '19/08/1996',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11001,
        nacimiento: '15/12/1987',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11002,
        nacimiento: '19/02/2001',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11003,
        nacimiento: '25/09/1987',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11004,
        nacimiento: '28/10/1985',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11005,
        nacimiento: '27/06/1984',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11006,
        nacimiento: '05/02/1998',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11007,
        nacimiento: '22/04/1988',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11008,
        nacimiento: '12/11/1990',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11009,
        nacimiento: '08/09/1999',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11010,
        nacimiento: '25/11/2006',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11011,
        nacimiento: '14/05/1980',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 11013,
        nacimiento: '01/04/1988',
        ingreso: '26/08/2025',
        sex: 'M',
      },
      {
        code: 11014,
        nacimiento: '20/02/2001',
        ingreso: '26/08/2025',
        sex: 'M',
      },
      {
        code: 11015,
        nacimiento: '10/06/1991',
        ingreso: '02/09/2025',
        sex: 'M',
      },
      {
        code: 11016,
        nacimiento: '01/06/1986',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11018,
        nacimiento: '01/05/1997',
        ingreso: '02/09/2025',
        sex: 'M',
      },
      {
        code: 11019,
        nacimiento: '19/01/1984',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11020,
        nacimiento: '16/11/1987',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11021,
        nacimiento: '15/02/1992',
        ingreso: '02/09/2025',
        sex: 'M',
      },
      {
        code: 11022,
        nacimiento: '07/01/2005',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11024,
        nacimiento: '19/02/2004',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11025,
        nacimiento: '20/02/2001',
        ingreso: '02/09/2025',
        sex: 'M',
      },
      {
        code: 11026,
        nacimiento: '31/03/1985',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11027,
        nacimiento: '08/11/1991',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11029,
        nacimiento: '10/06/1999',
        ingreso: '02/09/2025',
        sex: 'M',
      },
      {
        code: 11030,
        nacimiento: '01/12/1989',
        ingreso: '02/09/2025',
        sex: 'F',
      },
      {
        code: 11031,
        nacimiento: '16/08/2002',
        ingreso: '09/09/2025',
        sex: 'F',
      },
      {
        code: 11032,
        nacimiento: '18/04/1993',
        ingreso: '09/09/2025',
        sex: 'F',
      },
      {
        code: 11033,
        nacimiento: '30/10/1994',
        ingreso: '09/09/2025',
        sex: 'M',
      },
      {
        code: 11034,
        nacimiento: '01/01/1989',
        ingreso: '09/09/2025',
        sex: 'F',
      },
      {
        code: 11035,
        nacimiento: '28/11/1993',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 11036,
        nacimiento: '25/06/1986',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 11037,
        nacimiento: '16/10/1984',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 11038,
        nacimiento: '26/05/2002',
        ingreso: '23/09/2025',
        sex: 'M',
      },
      {
        code: 11039,
        nacimiento: '16/08/1985',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 11040,
        nacimiento: '04/12/2003',
        ingreso: '23/09/2025',
        sex: 'M',
      },
      {
        code: 11041,
        nacimiento: '08/07/1982',
        ingreso: '23/09/2025',
        sex: 'M',
      },
      {
        code: 11042,
        nacimiento: '09/07/1993',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 11043,
        nacimiento: '19/03/2004',
        ingreso: '23/09/2025',
        sex: 'M',
      },
      {
        code: 11044,
        nacimiento: '14/05/1987',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 11045,
        nacimiento: '15/08/1985',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 11046,
        nacimiento: '22/04/1989',
        ingreso: '30/09/2025',
        sex: 'F',
      },
      {
        code: 11047,
        nacimiento: '25/05/1991',
        ingreso: '30/09/2025',
        sex: 'F',
      },
      {
        code: 11048,
        nacimiento: '26/12/1994',
        ingreso: '30/09/2025',
        sex: 'M',
      },
      {
        code: 11049,
        nacimiento: '08/05/1992',
        ingreso: '30/09/2025',
        sex: 'F',
      },
      {
        code: 11050,
        nacimiento: '07/07/1990',
        ingreso: '30/09/2025',
        sex: 'M',
      },
      {
        code: 11051,
        nacimiento: '31/07/1988',
        ingreso: '30/09/2025',
        sex: 'M',
      },
      {
        code: 20003,
        nacimiento: '19/04/1971',
        ingreso: '04/10/2005',
        sex: 'M',
      },
      {
        code: 20005,
        nacimiento: '29/03/1978',
        ingreso: '10/07/2002',
        sex: 'F',
      },
      {
        code: 20010,
        nacimiento: '17/05/1977',
        ingreso: '03/01/1998',
        sex: 'M',
      },
      {
        code: 20011,
        nacimiento: '23/06/1982',
        ingreso: '29/05/2006',
        sex: 'F',
      },
      {
        code: 20019,
        nacimiento: '20/03/1972',
        ingreso: '01/03/2011',
        sex: 'M',
      },
      {
        code: 20029,
        nacimiento: '17/01/1991',
        ingreso: '16/06/2017',
        sex: 'F',
      },
      {
        code: 20031,
        nacimiento: '07/10/1985',
        ingreso: '11/05/2010',
        sex: 'M',
      },
      {
        code: 20037,
        nacimiento: '21/08/1984',
        ingreso: '07/08/2017',
        sex: 'F',
      },
      {
        code: 20042,
        nacimiento: '23/02/1996',
        ingreso: '03/01/2019',
        sex: 'M',
      },
      {
        code: 20047,
        nacimiento: '01/09/1992',
        ingreso: '01/10/2018',
        sex: 'M',
      },
      {
        code: 20052,
        nacimiento: '23/03/1995',
        ingreso: '21/01/2020',
        sex: 'F',
      },
      {
        code: 20055,
        nacimiento: '14/04/1977',
        ingreso: '02/07/2020',
        sex: 'M',
      },
      {
        code: 20057,
        nacimiento: '30/08/1992',
        ingreso: '03/08/2020',
        sex: 'M',
      },
      {
        code: 20060,
        nacimiento: '28/12/1987',
        ingreso: '09/11/2020',
        sex: 'M',
      },
      {
        code: 20069,
        nacimiento: '28/09/1994',
        ingreso: '03/01/2022',
        sex: 'F',
      },
      {
        code: 20071,
        nacimiento: '24/05/1997',
        ingreso: '11/01/2022',
        sex: 'F',
      },
      {
        code: 20072,
        nacimiento: '25/03/1995',
        ingreso: '17/01/2022',
        sex: 'M',
      },
      {
        code: 20080,
        nacimiento: '16/09/1977',
        ingreso: '04/01/2010',
        sex: 'M',
      },
      {
        code: 20081,
        nacimiento: '15/03/1980',
        ingreso: '08/07/2020',
        sex: 'M',
      },
      {
        code: 20082,
        nacimiento: '06/05/1985',
        ingreso: '03/01/2020',
        sex: 'F',
      },
      {
        code: 20086,
        nacimiento: '12/02/1992',
        ingreso: '16/06/2022',
        sex: 'F',
      },
      {
        code: 20090,
        nacimiento: '31/05/1993',
        ingreso: '25/07/2022',
        sex: 'M',
      },
      {
        code: 20094,
        nacimiento: '15/07/1997',
        ingreso: '03/11/2022',
        sex: 'M',
      },
      {
        code: 20096,
        nacimiento: '11/10/2000',
        ingreso: '03/01/2023',
        sex: 'F',
      },
      {
        code: 20097,
        nacimiento: '13/04/1975',
        ingreso: '30/11/2022',
        sex: 'M',
      },
      {
        code: 20098,
        nacimiento: '22/08/1992',
        ingreso: '30/11/2022',
        sex: 'M',
      },
      {
        code: 20099,
        nacimiento: '07/01/1984',
        ingreso: '07/12/2022',
        sex: 'M',
      },
      {
        code: 20101,
        nacimiento: '22/01/1994',
        ingreso: '04/01/2023',
        sex: 'M',
      },
      {
        code: 20107,
        nacimiento: '11/12/1996',
        ingreso: '25/01/2023',
        sex: 'F',
      },
      {
        code: 20109,
        nacimiento: '06/07/1993',
        ingreso: '15/02/2023',
        sex: 'M',
      },
      {
        code: 20111,
        nacimiento: '14/01/1996',
        ingreso: '15/02/2023',
        sex: 'M',
      },
      {
        code: 20113,
        nacimiento: '22/06/1993',
        ingreso: '22/02/2023',
        sex: 'M',
      },
      {
        code: 20117,
        nacimiento: '26/07/1997',
        ingreso: '03/04/2023',
        sex: 'F',
      },
      {
        code: 20118,
        nacimiento: '28/12/1988',
        ingreso: '24/05/2023',
        sex: 'M',
      },
      {
        code: 20120,
        nacimiento: '28/10/1993',
        ingreso: '07/06/2023',
        sex: 'M',
      },
      {
        code: 20124,
        nacimiento: '13/08/1990',
        ingreso: '13/07/2023',
        sex: 'M',
      },
      {
        code: 20125,
        nacimiento: '03/03/1984',
        ingreso: '01/08/2023',
        sex: 'M',
      },
      {
        code: 20127,
        nacimiento: '06/01/1968',
        ingreso: '02/10/2023',
        sex: 'F',
      },
      {
        code: 20133,
        nacimiento: '18/04/1995',
        ingreso: '29/11/2023',
        sex: 'M',
      },
      {
        code: 20134,
        nacimiento: '11/08/1999',
        ingreso: '29/11/2023',
        sex: 'M',
      },
      {
        code: 20136,
        nacimiento: '23/02/1972',
        ingreso: '06/12/2023',
        sex: 'F',
      },
      {
        code: 20137,
        nacimiento: '26/05/1998',
        ingreso: '15/02/2024',
        sex: 'M',
      },
      {
        code: 20138,
        nacimiento: '30/09/1979',
        ingreso: '11/03/2024',
        sex: 'F',
      },
      {
        code: 20139,
        nacimiento: '12/09/1990',
        ingreso: '01/04/2024',
        sex: 'M',
      },
      {
        code: 20140,
        nacimiento: '21/09/2001',
        ingreso: '08/05/2024',
        sex: 'F',
      },
      {
        code: 20142,
        nacimiento: '24/08/1995',
        ingreso: '17/06/2024',
        sex: 'M',
      },
      {
        code: 20143,
        nacimiento: '30/05/2000',
        ingreso: '17/06/2024',
        sex: 'F',
      },
      {
        code: 20144,
        nacimiento: '28/09/1993',
        ingreso: '24/06/2024',
        sex: 'F',
      },
      {
        code: 20145,
        nacimiento: '02/10/1993',
        ingreso: '24/06/2024',
        sex: 'F',
      },
      {
        code: 20146,
        nacimiento: '24/06/1995',
        ingreso: '02/10/2024',
        sex: 'F',
      },
      {
        code: 20147,
        nacimiento: '22/08/1995',
        ingreso: '19/11/2024',
        sex: 'M',
      },
      {
        code: 20149,
        nacimiento: '24/04/1978',
        ingreso: '25/11/2024',
        sex: 'M',
      },
      {
        code: 20150,
        nacimiento: '29/06/2000',
        ingreso: '25/11/2024',
        sex: 'F',
      },
      {
        code: 20151,
        nacimiento: '19/11/1995',
        ingreso: '02/12/2024',
        sex: 'M',
      },
      {
        code: 20153,
        nacimiento: '30/10/1992',
        ingreso: '10/02/2025',
        sex: 'M',
      },
      {
        code: 20154,
        nacimiento: '03/07/1984',
        ingreso: '12/02/2025',
        sex: 'M',
      },
      {
        code: 20155,
        nacimiento: '27/05/1998',
        ingreso: '25/02/2025',
        sex: 'F',
      },
      {
        code: 20156,
        nacimiento: '30/10/1993',
        ingreso: '25/02/2025',
        sex: 'M',
      },
      {
        code: 20157,
        nacimiento: '14/10/1989',
        ingreso: '25/02/2025',
        sex: 'F',
      },
      {
        code: 20159,
        nacimiento: '08/03/1996',
        ingreso: '25/03/2025',
        sex: 'F',
      },
      {
        code: 20160,
        nacimiento: '20/03/1982',
        ingreso: '01/04/2025',
        sex: 'M',
      },
      {
        code: 20161,
        nacimiento: '17/08/1994',
        ingreso: '01/04/2025',
        sex: 'F',
      },
      {
        code: 20162,
        nacimiento: '18/03/1986',
        ingreso: '01/04/2025',
        sex: 'M',
      },
      {
        code: 20165,
        nacimiento: '25/10/1999',
        ingreso: '08/04/2025',
        sex: 'M',
      },
      {
        code: 20166,
        nacimiento: '21/11/1995',
        ingreso: '21/04/2025',
        sex: 'M',
      },
      {
        code: 20167,
        nacimiento: '15/04/2001',
        ingreso: '21/04/2025',
        sex: 'M',
      },
      {
        code: 20169,
        nacimiento: '01/01/2001',
        ingreso: '20/05/2025',
        sex: 'M',
      },
      {
        code: 20170,
        nacimiento: '06/10/1999',
        ingreso: '27/05/2025',
        sex: 'F',
      },
      {
        code: 20172,
        nacimiento: '13/01/2000',
        ingreso: '24/06/2025',
        sex: 'F',
      },
      {
        code: 20173,
        nacimiento: '07/08/1994',
        ingreso: '08/07/2025',
        sex: 'F',
      },
      {
        code: 20174,
        nacimiento: '21/07/1998',
        ingreso: '15/07/2025',
        sex: 'M',
      },
      {
        code: 20177,
        nacimiento: '08/06/1986',
        ingreso: '22/07/2025',
        sex: 'F',
      },
      {
        code: 20179,
        nacimiento: '10/11/1996',
        ingreso: '22/07/2025',
        sex: 'M',
      },
      {
        code: 20180,
        nacimiento: '05/01/1999',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 20181,
        nacimiento: '02/02/1983',
        ingreso: '19/08/2025',
        sex: 'M',
      },
      {
        code: 20182,
        nacimiento: '29/07/1977',
        ingreso: '26/08/2025',
        sex: 'F',
      },
      {
        code: 20183,
        nacimiento: '27/03/1981',
        ingreso: '26/08/2025',
        sex: 'M',
      },
      {
        code: 20184,
        nacimiento: '04/08/1972',
        ingreso: '26/08/2025',
        sex: 'M',
      },
      {
        code: 20186,
        nacimiento: '06/12/1992',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 20187,
        nacimiento: '22/01/1997',
        ingreso: '23/09/2025',
        sex: 'F',
      },
      {
        code: 20188,
        nacimiento: '02/12/1992',
        ingreso: '30/09/2025',
        sex: 'F',
      },
    ];

    // {code: 20188, nacimiento: '02/12/1992', ingreso: '30/09/2025', sex:'F'},

    const generoF = await this.genreRepository.findOneBy({ name: 'Femenino' });
    const generoM = await this.genreRepository.findOneBy({ name: 'Masculino' });

    const generos = { M: generoM, F: generoF };

    for (const employee of employees) {
      const existingPlants = employee.manufacturingPlants || [];
      const plantIds = new Set(existingPlants.map((p) => p.id));
      plantMx.forEach((plant) => plantIds.add(plant.id));
      const updatedPlants = [
        ...existingPlants,
        ...plantMx.filter((p) => !existingPlants.some((ep) => ep.id === p.id)),
      ];

      const empleadoActual = data.find((d) => d.code === employee.code);

      const birthdate =
        empleadoActual?.nacimiento?.split('/')?.reverse()?.join('-') || null;

      const dateOfAdmission = empleadoActual?.ingreso
        ?.split('/')
        ?.reverse()
        ?.join('-');

      const sexo = generos[empleadoActual?.sex] || null;

      await this.employeeRepository.save({
        ...employee,
        manufacturingPlants: updatedPlants,
        ...(birthdate && { birthdate: new Date(birthdate) }),
        ...(dateOfAdmission && { dateOfAdmission: new Date(dateOfAdmission) }),
        ...(sexo && {
          gender: sexo,
        }),
      });
    }
    this.logger.log('Employees seeded successfully.');
  }

  async seed() {
    await this.seedAccidentPositions();
    await this.seedBodyParts();
    await this.seedAreas();
    await this.seedAssociatedTasks();
    await this.seedAtAgents();
    await this.seedAtMechanisms();
    await this.seedCieDiagnoses();
    await this.seedCountries();
    await this.seedGenres();
    await this.seedMachines();
    await this.seedNatureOfEvents();
    await this.seedRiskFactors();
    await this.seedTypeOfInjuries();
    await this.seedTypeOfLinks();
    await this.seedTypesOfEvents();
    await this.seedWorkingDays();
    await this.seedEmployees();
    this.logger.debug('Seeding completed.');
    return 'Seeding...';
  }
}
