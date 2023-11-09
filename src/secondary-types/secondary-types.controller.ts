import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { SecondaryTypesService } from './secondary-types.service';
import { CreateSecondaryTypeDto, UpdateSecondaryTypeDto } from './dto';

@Controller('secondary-types')
export class SecondaryTypesController {
  constructor(private readonly secondaryTypesService: SecondaryTypesService) {}

  @Post()
  create(@Body() createSecondaryTypeDto: CreateSecondaryTypeDto) {
    return this.secondaryTypesService.create(createSecondaryTypeDto);
  }

  @Get()
  findAll() {
    return this.secondaryTypesService.findAll();
  }

  @Get('by/manufacturing-plant/:id')
  findAllByManufacturingPlant(@Param('id') id: string) {
    return this.secondaryTypesService.findAllByManufacturingPlant(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secondaryTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSecondaryTypeDto: UpdateSecondaryTypeDto,
  ) {
    return this.secondaryTypesService.update(+id, updateSecondaryTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secondaryTypesService.remove(+id);
  }
}
