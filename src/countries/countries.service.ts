import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateCountryDto, UpdateCountryDto } from './dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  seed() {
    const data = ['México', 'Colombia'];

    data.forEach(async (name) => {
      const event = this.countryRepository.create({ name });
      await this.countryRepository.save(event);
    });

    return 'Seeding countries...';
  }

  create(createCountryDto: CreateCountryDto) {
    return createCountryDto;
  }

  findAll() {
    return `This action returns all countries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return { id, updateCountryDto };
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
