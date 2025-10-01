import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateAtMechanismDto, UpdateAtMechanismDto } from './dto';
import { AtMechanism } from './entities/at-mechanism.entity';

@Injectable()
export class AtMechanismsService {
  constructor(
    @InjectRepository(AtMechanism)
    private readonly atMechanismRepository: Repository<AtMechanism>,
  ) {}

  seed() {
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

    data.forEach(async (name) => {
      const atMechanism = this.atMechanismRepository.create({ name });
      await this.atMechanismRepository.save(atMechanism);
    });

    return 'Seeding at mechanisms...';
  }

  create(createAtMechanismDto: CreateAtMechanismDto) {
    return createAtMechanismDto;
  }

  findAll() {
    return `This action returns all atMechanisms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atMechanism`;
  }

  update(id: number, updateAtMechanismDto: UpdateAtMechanismDto) {
    return { id, updateAtMechanismDto };
  }

  remove(id: number) {
    return `This action removes a #${id} atMechanism`;
  }
}
