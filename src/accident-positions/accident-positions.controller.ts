import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateAccidentPositionDto, UpdateAccidentPositionDto } from './dto';
import { AccidentPositionsService } from './accident-positions.service';

@Controller('accident-positions')
export class AccidentPositionsController {
  constructor(
    private readonly accidentPositionsService: AccidentPositionsService,
  ) {}

  @Post()
  create(@Body() createAccidentPositionDto: CreateAccidentPositionDto) {
    return this.accidentPositionsService.create(createAccidentPositionDto);
  }

  @Post('seed')
  seed() {
    return this.accidentPositionsService.seed();
  }

  @Get()
  findAll() {
    return this.accidentPositionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accidentPositionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccidentPositionDto: UpdateAccidentPositionDto,
  ) {
    return this.accidentPositionsService.update(+id, updateAccidentPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accidentPositionsService.remove(+id);
  }
}
