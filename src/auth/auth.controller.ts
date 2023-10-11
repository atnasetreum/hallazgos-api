import { Controller, Post, Body, Res } from '@nestjs/common';

import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const token = await this.authService.login(loginAuthDto);

    response.setHeader('Set-Cookie', token);

    return response.json({ message: 'Bienvenido al sistema' });
  }
}
