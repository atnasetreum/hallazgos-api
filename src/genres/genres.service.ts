import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { CreateGenreDto, UpdateGenreDto } from './dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  seed() {
    const data = ['Masculino', 'Femenino'];

    data.forEach(async (name) => {
      const event = this.genreRepository.create({ name });
      await this.genreRepository.save(event);
    });

    return 'Seeding genres...';
  }

  create(createGenreDto: CreateGenreDto) {
    return createGenreDto;
  }

  findAll() {
    return `This action returns all genres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return { id, updateGenreDto };
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
