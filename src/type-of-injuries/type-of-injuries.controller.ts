import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateTypeOfInjuryDto, UpdateTypeOfInjuryDto } from './dto';
import { TypeOfInjuriesService } from './type-of-injuries.service';

@Controller('type-of-injuries')
export class TypeOfInjuriesController {
  constructor(private readonly typeOfInjuriesService: TypeOfInjuriesService) {}

  @Post()
  create(@Body() createTypeOfInjuryDto: CreateTypeOfInjuryDto) {
    return this.typeOfInjuriesService.create(createTypeOfInjuryDto);
  }

  @Post('seed')
  seed() {
    return this.typeOfInjuriesService.seed();
  }

  @Get()
  findAll() {
    return this.typeOfInjuriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeOfInjuriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeOfInjuryDto: UpdateTypeOfInjuryDto,
  ) {
    return this.typeOfInjuriesService.update(+id, updateTypeOfInjuryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeOfInjuriesService.remove(+id);
  }
}
