import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateRulesOfLifeDto, UpdateRulesOfLifeDto } from './dto';
import { RulesOfLifeService } from './rules-of-life.service';

@Controller('rules-of-life')
export class RulesOfLifeController {
  constructor(private readonly rulesOfLifeService: RulesOfLifeService) {}

  @Post()
  create(@Body() createRulesOfLifeDto: CreateRulesOfLifeDto) {
    return this.rulesOfLifeService.create(createRulesOfLifeDto);
  }

  @Post('seed')
  seed() {
    return this.rulesOfLifeService.seed();
  }

  @Get()
  findAll() {
    return this.rulesOfLifeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulesOfLifeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRulesOfLifeDto: UpdateRulesOfLifeDto,
  ) {
    return this.rulesOfLifeService.update(+id, updateRulesOfLifeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulesOfLifeService.remove(+id);
  }
}
