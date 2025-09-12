import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateRiskFactorDto, UpdateRiskFactorDto } from './dto';
import { RiskFactorsService } from './risk-factors.service';

@Controller('risk-factors')
export class RiskFactorsController {
  constructor(private readonly riskFactorsService: RiskFactorsService) {}

  @Post()
  create(@Body() createRiskFactorDto: CreateRiskFactorDto) {
    return this.riskFactorsService.create(createRiskFactorDto);
  }

  @Get()
  findAll() {
    return this.riskFactorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskFactorsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRiskFactorDto: UpdateRiskFactorDto,
  ) {
    return this.riskFactorsService.update(+id, updateRiskFactorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskFactorsService.remove(+id);
  }
}
