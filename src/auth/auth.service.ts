import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { serialize } from 'cookie';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@shared/services';
import { User } from 'users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<string> {
    const { email, password } = loginAuthDto;

    const user = await this.userRepository.findOne({
      where: {
        email,
        isActive: true,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user)
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);

    if (!(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    const token = this.jwtService.create(user.id);

    const serialized = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
    });

    return serialized;
  }
}
