import { Injectable } from '@nestjs/common';

import { CreateGenreDto, UpdateGenreDto } from './dto';

@Injectable()
export class GenresService {
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
