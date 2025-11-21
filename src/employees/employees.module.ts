import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Employee, EmployeeArea, EmployeePosition } from './entities';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Genre } from 'genres/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, EmployeeArea, EmployeePosition, Genre]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [TypeOrmModule, EmployeesService],
})
export class EmployeesModule {}
