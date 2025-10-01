import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateAssociatedTaskDto, UpdateAssociatedTaskDto } from './dto';
import { AssociatedTask } from './entities/associated-task.entity';

@Injectable()
export class AssociatedTasksService {
  constructor(
    @InjectRepository(AssociatedTask)
    private readonly associatedTaskRepository: Repository<AssociatedTask>,
  ) {}

  seed() {
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

    data.forEach(async (name) => {
      const associatedTask = this.associatedTaskRepository.create({ name });
      await this.associatedTaskRepository.save(associatedTask);
    });

    return 'Seeding associated tasks...';
  }

  create(createAssociatedTaskDto: CreateAssociatedTaskDto) {
    return createAssociatedTaskDto;
  }

  findAll() {
    return `This action returns all associatedTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} associatedTask`;
  }

  update(id: number, updateAssociatedTaskDto: UpdateAssociatedTaskDto) {
    return { id, updateAssociatedTaskDto };
  }

  remove(id: number) {
    return `This action removes a #${id} associatedTask`;
  }
}
