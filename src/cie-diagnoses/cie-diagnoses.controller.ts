import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CieDiagnosesService } from './cie-diagnoses.service';

import { CreateCieDiagnosisDto, UpdateCieDiagnosisDto } from './dto';

@Controller('cie-diagnoses')
export class CieDiagnosesController {
  constructor(private readonly cieDiagnosesService: CieDiagnosesService) {}

  @Post()
  create(@Body() createCieDiagnosisDto: CreateCieDiagnosisDto) {
    return this.cieDiagnosesService.create(createCieDiagnosisDto);
  }

  @Post('seed')
  seed() {
    return this.cieDiagnosesService.seed();
  }

  @Get()
  findAll() {
    return this.cieDiagnosesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cieDiagnosesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCieDiagnosisDto: UpdateCieDiagnosisDto,
  ) {
    return this.cieDiagnosesService.update(+id, updateCieDiagnosisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cieDiagnosesService.remove(+id);
  }
}
