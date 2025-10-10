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

import { AccidentPositionsService } from './accident-positions.service';
import {
  CreateAccidentPositionDto,
  FiltersAccidentPositionDto,
  UpdateAccidentPositionDto,
} from './dto';

@Controller('accident-positions')
export class AccidentPositionsController {
  constructor(
    private readonly accidentPositionsService: AccidentPositionsService,
  ) {}

  @Post()
  create(@Body() createAccidentPositionDto: CreateAccidentPositionDto) {
    return this.accidentPositionsService.create(createAccidentPositionDto);
  }

  @Get()
  findAll(@Query() filtersAccidentPositionDto: FiltersAccidentPositionDto) {
    return this.accidentPositionsService.findAll(filtersAccidentPositionDto);
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
