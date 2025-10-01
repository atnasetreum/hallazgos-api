import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateTypeOfLinkDto, UpdateTypeOfLinkDto } from './dto';
import { TypeOfLinksService } from './type-of-links.service';

@Controller('type-of-links')
export class TypeOfLinksController {
  constructor(private readonly typeOfLinksService: TypeOfLinksService) {}

  @Post()
  create(@Body() createTypeOfLinkDto: CreateTypeOfLinkDto) {
    return this.typeOfLinksService.create(createTypeOfLinkDto);
  }

  @Post('seed')
  seed() {
    return this.typeOfLinksService.seed();
  }

  @Get()
  findAll() {
    return this.typeOfLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeOfLinksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeOfLinkDto: UpdateTypeOfLinkDto,
  ) {
    return this.typeOfLinksService.update(+id, updateTypeOfLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeOfLinksService.remove(+id);
  }
}
