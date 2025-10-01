import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateMachineDto, UpdateMachineDto } from './dto';
import { Machine } from './entities/machine.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  seed() {
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

    data.forEach(async (name) => {
      const machine = this.machineRepository.create({ name });
      await this.machineRepository.save(machine);
    });

    return 'Seeding machines...';
  }

  create(createMachineDto: CreateMachineDto) {
    return createMachineDto;
  }

  findAll() {
    return `This action returns all machines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} machine`;
  }

  update(id: number, updateMachineDto: UpdateMachineDto) {
    return { id, updateMachineDto };
  }

  remove(id: number) {
    return `This action removes a #${id} machine`;
  }
}
