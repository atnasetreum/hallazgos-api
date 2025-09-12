import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateAccidentDto, UpdateAccidentDto } from './dto';
import { AccidentsService } from './accidents.service';

@Controller('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Post()
  create(@Body() createAccidentDto: CreateAccidentDto) {
    return this.accidentsService.create(createAccidentDto);
  }

  @Get()
  findAll() {
    return this.accidentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccidentDto: UpdateAccidentDto,
  ) {
    return this.accidentsService.update(+id, updateAccidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentsService.remove(+id);
  }
}
