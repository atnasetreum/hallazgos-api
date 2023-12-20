import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Evidence } from 'evidences/entities/evidence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evidence])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [TypeOrmModule, DashboardService],
})
export class DashboardModule {}
