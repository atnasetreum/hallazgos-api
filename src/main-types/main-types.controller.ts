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

import { MainTypesService } from './main-types.service';
import { CreateMainTypeDto, QueryMainTypeDto, UpdateMainTypeDto } from './dto';

@Controller('main-types')
export class MainTypesController {
  constructor(private readonly mainTypesService: MainTypesService) {}

  @Post()
  create(@Body() createMainTypeDto: CreateMainTypeDto) {
    return this.mainTypesService.create(createMainTypeDto);
  }

  @Get()
  findAll(@Query() queryMainTypeDto: QueryMainTypeDto) {
    return this.mainTypesService.findAll(queryMainTypeDto);
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
