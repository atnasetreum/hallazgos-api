import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { MainTypesService } from './main-types.service';
import { CreateMainTypeDto, UpdateMainTypeDto } from './dto';

@Controller('main-types')
export class MainTypesController {
  constructor(private readonly mainTypesService: MainTypesService) {}

  @Post()
  create(@Body() createMainTypeDto: CreateMainTypeDto) {
    return this.mainTypesService.create(createMainTypeDto);
  }

  @Get()
  findAll() {
    return this.mainTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMainTypeDto: UpdateMainTypeDto,
  ) {
    return this.mainTypesService.update(+id, updateMainTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainTypesService.remove(+id);
  }
}
