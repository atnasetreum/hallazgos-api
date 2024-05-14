import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('status')
  findAllStatus() {
    return this.dashboardService.findAllStatus();
  }

  @Get('zones')
  findAllZones() {
    return this.dashboardService.findAllZones();
  }

  @Get('main-types')
  findAllMainTypes() {
    return this.dashboardService.findAllMainTypes();
  }
}
