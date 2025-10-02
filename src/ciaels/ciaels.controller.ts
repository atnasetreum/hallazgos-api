import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateCiaelDto, UpdateCiaelDto } from './dto';
import { CiaelsService } from './ciaels.service';

@Controller('ciaels')
export class CiaelsController {
  constructor(private readonly ciaelsService: CiaelsService) {}

  @Post()
  create(@Body() createCiaelDto: CreateCiaelDto) {
    return this.ciaelsService.create(createCiaelDto);
  }

  @Post('seed')
  seed() {
    return this.ciaelsService.seed();
  }

  @Get()
  findAll() {
    return this.ciaelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciaelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCiaelDto: UpdateCiaelDto) {
    return this.ciaelsService.update(+id, updateCiaelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciaelsService.remove(+id);
  }
}
