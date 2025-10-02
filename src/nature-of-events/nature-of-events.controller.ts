import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateNatureOfEventDto, UpdateNatureOfEventDto } from './dto';
import { NatureOfEventsService } from './nature-of-events.service';

@Controller('nature-of-events')
export class NatureOfEventsController {
  constructor(private readonly natureOfEventsService: NatureOfEventsService) {}

  @Post()
  create(@Body() createNatureOfEventDto: CreateNatureOfEventDto) {
    return this.natureOfEventsService.create(createNatureOfEventDto);
  }

  @Get()
  findAll() {
    return this.natureOfEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natureOfEventsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNatureOfEventDto: UpdateNatureOfEventDto,
  ) {
    return this.natureOfEventsService.update(+id, updateNatureOfEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.natureOfEventsService.remove(+id);
  }
}
