import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateEquipmentDto, UpdateEquipmentDto } from './dto';
import { Equipment, EquipmentCostHistory } from './entities';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectRepository(EquipmentCostHistory)
    private readonly equipmentCostHistoryRepository: Repository<EquipmentCostHistory>,
  ) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return createEquipmentDto;
  }

  async seed() {
    const equipments = [
      { name: 'GUANTES BLANCOS', price: '22.50' },
      { name: 'GUANTES NEGROS', price: '97.50' },
      { name: 'BOTA DE SEGURIDAD', price: '539' },
      { name: 'LENTES DE SEGURIDAD', price: '20' },
      { name: 'TAPON AUDITIVO', price: '5' },
      { name: 'RESPIRADOR', price: '60' },
      { name: 'MANGAS', price: '16.50' },
      { name: 'MANDIL', price: '107' },
      { name: 'GUANTE NEOPRENO', price: '3' },
      { name: 'GUANTE VERDE PARA QUIMICOS', price: '50' },
      { name: 'CASCO', price: '70' },
    ];

    for (const equipment of equipments) {
      const equipmentNew = await this.equipmentRepository.save({
        name: equipment.name,
      });

      await this.equipmentCostHistoryRepository.save({
        price: Number(equipment.price),
        equipment: equipmentNew,
        captureDate: new Date(),
      });
    }

    return {
      message: 'Equipments seeded successfully',
    };
  }

  findAll() {
    return this.equipmentRepository.find({
      where: {
        isActive: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return { id, updateEquipmentDto };
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
