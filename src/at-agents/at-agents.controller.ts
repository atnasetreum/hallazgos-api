import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateAtAgentDto, UpdateAtAgentDto } from './dto';
import { AtAgentsService } from './at-agents.service';

@Controller('at-agents')
export class AtAgentsController {
  constructor(private readonly atAgentsService: AtAgentsService) {}

  @Post()
  create(@Body() createAtAgentDto: CreateAtAgentDto) {
    return this.atAgentsService.create(createAtAgentDto);
  }

  @Get()
  findAll() {
    return this.atAgentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atAgentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtAgentDto: UpdateAtAgentDto) {
    return this.atAgentsService.update(+id, updateAtAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atAgentsService.remove(+id);
  }
}
