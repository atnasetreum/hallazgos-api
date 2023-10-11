import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { JwtService } from '@shared/services';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.statusCode;

    const token = req.cookies['token'] ? `${req.cookies['token']}` : '';

    if (!token) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    try {
      const decoded = this.jwtService.verify(token);
      req['userId'] = decoded.userId;
      next();
    } catch (error) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
  }
}
