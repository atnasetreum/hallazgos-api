import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateTypesOfEventDto, UpdateTypesOfEventDto } from './dto';
import { TypesOfEventsService } from './types-of-events.service';

@Controller('types-of-events')
export class TypesOfEventsController {
  constructor(private readonly typesOfEventsService: TypesOfEventsService) {}

  @Post()
  create(@Body() createTypesOfEventDto: CreateTypesOfEventDto) {
    return this.typesOfEventsService.create(createTypesOfEventDto);
  }

  @Post('seed')
  seed() {
    return this.typesOfEventsService.seed();
  }

  @Get()
  findAll() {
    return this.typesOfEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesOfEventsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypesOfEventDto: UpdateTypesOfEventDto,
  ) {
    return this.typesOfEventsService.update(+id, updateTypesOfEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesOfEventsService.remove(+id);
  }
}
