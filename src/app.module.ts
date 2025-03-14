import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { EnvConfiguration, JoiValidationSchema } from '@config';

import { AppKeyMiddleware, JwtMiddleware } from '@shared/middlewares';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ManufacturingPlantsModule } from './manufacturing-plants/manufacturing-plants.module';
import { EvidencesModule } from './evidences/evidences.module';
import { ZonesModule } from './zones/zones.module';
import { MainTypesModule } from './main-types/main-types.module';
import { SecondaryTypesModule } from './secondary-types/secondary-types.module';
import { MailModule } from './mail/mail.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { JwtService } from 'auth/jwt.service';
import { ProcessesModule } from 'processes/processes.module';

@Module({
  imports: [
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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule, AuthModule],
      inject: [ConfigService, JwtService],
      useFactory: (configService: ConfigService, jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        introspection: true,
        async context({ req }) {
          const appKey = configService.get<string>('appKey');

          const appKeyHeader = req.headers['x-app-key'];

          if (!appKeyHeader) {
            throw Error('API Key es requerido');
          }

          if (appKeyHeader !== appKey) {
            throw Error('API Key es inválido');
          }

          let token = '';

          token = req.cookies['token'] ? `${req.cookies['token']}` : '';

          if (!token) {
            token = `${req.headers['authorization']}`.split('Bearer ')[1] || '';
          }

          if (!token) {
            throw Error('Token no encontrado');
          }

          try {
            const user = await jwtService.verify(token);
            req['user'] = { ...user };
            return { request: req };
          } catch (error) {
            throw Error('Credenciales no válidas');
          }
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UsersModule,
    ManufacturingPlantsModule,
    EvidencesModule,
    ZonesModule,
    MainTypesModule,
    SecondaryTypesModule,
    MailModule,
    DashboardModule,
    ProcessesModule,
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
