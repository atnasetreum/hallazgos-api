import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

import { Repository } from 'typeorm';
import { Request } from 'express';

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
import { Zone } from 'zones/entities/zone.entity';
import { Area } from 'areas/entities/area.entity';
import { User } from 'users/entities/user.entity';
import { Ciael } from './entities/ciael.entity';
import { Employee } from 'employees/entities';
import { Genre } from 'genres/entities/genre.entity';
//import { calculateAge } from '@shared/utils';

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

    const newCiael = await this.ciaelRepository.save({
      manufacturingPlant,
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
      workingDay,
      timeWorked,
      usualWork,
      typeOfLink,
      isDeath,
      accidentPosition,
      machine,
      isInside,
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

  seedAccidentPositions() {
    const data = [
      'Jefe de Servicios Generales',
      'Operador Saponificación',
      'Operador ayudante de mezclado',
      'Operador de acabado',
      'Operador de Empaque',
      'OPERADOR DE EMPAQUE - NIVEL 1',
      'Operador de Mantenimiento Mecanico',
      'Operador de Secado',
      'Operador de Secado N1',
      'Operador general',
      'Operador general de empaque',
      'Operador logistico granel',
      'Operario Ayudante de Secado',
      'Operario de Acabado',
      'Operario de mantenimiento electrico',
      'Operario de Mantenimiento mecanico',
      'Operario de puesta a punto',
      'Operario general',
      'OPERARIO LOCATIVO DE INFRAESTRUCTURA',
      'Operario Mantenimiento Locativo',
      'Operario Mantenimiento Mecanico',
    ];

    this.logger.log('Seeding accident positions...');
    data.forEach(async (name) => {
      const accidentPosition = this.accidentPositionRepository.create({ name });
      await this.accidentPositionRepository.save(accidentPosition);
    });
    this.logger.log('Accident positions seeded successfully.');
  }

  seedAreas() {
    const data = [
      'ADMINISTRATIVO',
      'ECOFIRE',
      'EMPAQUE MANUAL',
      'LIQUIDOS',
      'LOGISTICA BODEGA FASE 2',
      'MANTENIMIENTO',
      'MEZCLADO',
      'PATIO TANQUE',
      'SAPONIFICACION Y SECADO',
      'SERVICIOS GENERALES',
      'SOLIDOS',
      'TALLER DE MANTENIMIENTO',
    ];

    this.logger.log('Seeding areas...');
    data.forEach(async (name) => {
      const area = this.areaRepository.create({ name });
      await this.areaRepository.save(area);
    });
    this.logger.log('Areas seeded successfully.');
  }

  seedAssociatedTasks() {
    const data = [
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
    data.forEach(async (name) => {
      const associatedTask = this.associatedTaskRepository.create({ name });
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

  seedMachines() {
    const data = [
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
    this.logger.log('Seeding machines...');
    data.forEach(async (name) => {
      const machine = this.machineRepository.create({ name });
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
    const data = ['Accidente de trabajo', 'Incidente de trabajo'];
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

  seed() {
    this.seedBodyParts();
    this.seedAccidentPositions();
    this.seedAreas();
    this.seedAssociatedTasks();
    this.seedAtAgents();
    this.seedAtMechanisms();
    this.seedCieDiagnoses();
    this.seedCountries();
    this.seedGenres();
    this.seedMachines();
    this.seedNatureOfEvents();
    this.seedRiskFactors();
    this.seedTypeOfInjuries();
    this.seedTypeOfLinks();
    this.seedTypesOfEvents();
    this.seedWorkingDays();
    return 'Seeding...';
  }
}
