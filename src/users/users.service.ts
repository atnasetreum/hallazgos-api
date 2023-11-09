import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );

    return this.findOne(user.id);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!user)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);

    return user;
  }

  async getInformationCurrentUser(): Promise<User> {
    const userId = this.request['user'].userId as number;

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isActive: true,
        manufacturingPlants: {
          isActive: true,
        },
        zones: {
          isActive: true,
        },
      },
      relations: ['manufacturingPlants', 'zones'],
    });

    if (!user)
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    const user = await this.userRepository.save(
      await this.userRepository.preload({
        id,
        ...updateUserDto,
      }),
    );

    return this.findOne(user.id);
  }

  async remove(id: number): Promise<User> {
    await this.findOne(id);

    return await this.userRepository.save(
      await this.userRepository.preload({
        id,
        isActive: false,
      }),
    );
  }
}
