import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { EnvConfiguration, JoiValidationSchema } from '@config';

import { AppKeyMiddleware, JwtMiddleware } from '@shared/middlewares';
import { JwtService } from '@shared/services';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ManufacturingPlantsModule } from './manufacturing-plants/manufacturing-plants.module';
import { EvidencesModule } from './evidences/evidences.module';
import { ZonesModule } from './zones/zones.module';
import { MainTypesModule } from './main-types/main-types.module';
import { SecondaryTypesModule } from './secondary-types/secondary-types.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ManufacturingPlantsModule,
    EvidencesModule,
    ZonesModule,
    MainTypesModule,
    SecondaryTypesModule,
    MailModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppKeyMiddleware).forRoutes('*');
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/check-token', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
