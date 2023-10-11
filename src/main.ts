import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import { GlobalExceptionFilter } from '@shared/filters';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: `${process.env.WHITE_LIST_DOMAINS}`.split(','),
      credentials: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());

  app.setGlobalPrefix('/api/v1');

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT);

  console.log(
    `[APP-SERVICE] Running on port: [${process.env.PORT}], environment: [${process.env.NODE_ENV}]`,
  );
}
bootstrap();
