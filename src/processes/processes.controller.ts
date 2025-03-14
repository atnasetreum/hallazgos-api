import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ProcessesService } from './processes.service';
import {
  CreateProcessesDto,
  QueryProcessesDto,
  UpdateProcessesDto,
} from './dto';

@Controller('Processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  create(@Body() createProcessesDto: CreateProcessesDto) {
    return this.processesService.create(createProcessesDto);
  }

  @Get()
  findAll(@Query() queryProcessesDto: QueryProcessesDto) {
    return this.processesService.findAll(queryProcessesDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcessesDto: UpdateProcessesDto,
  ) {
    return this.processesService.update(+id, updateProcessesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processesService.remove(+id);
  }
}
