import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateTypeOfInjuryDto, UpdateTypeOfInjuryDto } from './dto';
import { TypeOfInjury } from './entities/type-of-injury.entity';

@Injectable()
export class TypeOfInjuriesService {
  constructor(
    @InjectRepository(TypeOfInjury)
    private readonly typeOfInjuryRepository: Repository<TypeOfInjury>,
  ) {}

  seed() {
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

    data.forEach(async (name) => {
      const typeOfInjury = this.typeOfInjuryRepository.create({ name });
      await this.typeOfInjuryRepository.save(typeOfInjury);
    });

    return 'Seeding type of injuries...';
  }

  create(createTypeOfInjuryDto: CreateTypeOfInjuryDto) {
    return createTypeOfInjuryDto;
  }

  findAll() {
    return `This action returns all typeOfInjuries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeOfInjury`;
  }

  update(id: number, updateTypeOfInjuryDto: UpdateTypeOfInjuryDto) {
    return { id, updateTypeOfInjuryDto };
  }

  remove(id: number) {
    return `This action removes a #${id} typeOfInjury`;
  }
}
