import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateBodyPartDto, UpdateBodyPartDto } from './dto';
import { BodyPartsService } from './body-parts.service';

@Controller('body-parts')
export class BodyPartsController {
  constructor(private readonly bodyPartsService: BodyPartsService) {}

  @Post()
  create(@Body() createBodyPartDto: CreateBodyPartDto) {
    return this.bodyPartsService.create(createBodyPartDto);
  }

  @Post('seed')
  seed() {
    return this.bodyPartsService.seed();
  }

  @Get()
  findAll() {
    return this.bodyPartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodyPartsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBodyPartDto: UpdateBodyPartDto,
  ) {
    return this.bodyPartsService.update(+id, updateBodyPartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodyPartsService.remove(+id);
  }
}
