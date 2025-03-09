import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateTypeManageDto, UpdateTypeManageDto } from './dto';
import { TypeManagesService } from './type-manages.service';

@Controller('type-manages')
export class TypeManagesController {
  constructor(private readonly typeManagesService: TypeManagesService) {}

  @Post()
  create(@Body() createTypeManageDto: CreateTypeManageDto) {
    return this.typeManagesService.create(createTypeManageDto);
  }

  @Get()
  findAll() {
    return this.typeManagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeManagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeManageDto: UpdateTypeManageDto,
  ) {
    return this.typeManagesService.update(+id, updateTypeManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeManagesService.remove(+id);
  }
}
