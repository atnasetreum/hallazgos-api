import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

import { serialize } from 'cookie';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Request } from 'express';

import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@shared/services';
import { User } from 'users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  nameCookie: string;
  environment: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {
    this.environment = this.configService.get<string>('environment');
    this.nameCookie = 'token';
  }

  get optsSerialize() {
    return {
      httpOnly: true,
      secure: this.environment !== 'development',
      // secure: false,
      //sameSite: 'strict',
      sameSite: 'same',
      path: '/',
    };
  }

  async login(loginAuthDto: LoginAuthDto): Promise<string> {
    const { email, password } = loginAuthDto;

    const user = await this.userRepository.findOne({
      where: {
        email,
        isActive: true,
      },
      relations: ['manufacturingPlants'],
      select: {
        id: true,
        password: true,
      },
    });

    if (!user)
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);

    if (!user.manufacturingPlants.length)
      throw new UnauthorizedException('Usuario no tiene plantas asignadas');

    if (!(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    const token = this.jwtService.create(user.id);

    const serialized = serialize(this.nameCookie, token, {
      ...this.optsSerialize,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return serialized;
  }

  async logout(): Promise<string> {
    const token = this.request['user'].token as string;

    const serialized = serialize(this.nameCookie, token, {
      ...this.optsSerialize,
      maxAge: 0,
    });

    return serialized;
  }

  checkToken(): {
    message: string;
  } {
    const token = this.request.headers['authorization'].split(' ')[1];
    try {
      this.jwtService.verify(token);
      return { message: 'Token válido.' };
    } catch (error) {
      throw new UnauthorizedException('Token no válido');
    }
  }
}
