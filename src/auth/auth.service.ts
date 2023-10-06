import { Injectable } from '@nestjs/common';

import { serialize } from 'cookie';

import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  login(loginAuthDto: LoginAuthDto) {
    console.log({ loginAuthDto });

    const serialized = serialize('token', 'dsfgfdggfg', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
    });

    return serialized;
  }
}
