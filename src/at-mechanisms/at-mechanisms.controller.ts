import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateAtMechanismDto, UpdateAtMechanismDto } from './dto';
import { AtMechanismsService } from './at-mechanisms.service';

@Controller('at-mechanisms')
export class AtMechanismsController {
  constructor(private readonly atMechanismsService: AtMechanismsService) {}

  @Post()
  create(@Body() createAtMechanismDto: CreateAtMechanismDto) {
    return this.atMechanismsService.create(createAtMechanismDto);
  }

  @Get()
  findAll() {
    return this.atMechanismsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atMechanismsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAtMechanismDto: UpdateAtMechanismDto,
  ) {
    return this.atMechanismsService.update(+id, updateAtMechanismDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atMechanismsService.remove(+id);
  }
}
