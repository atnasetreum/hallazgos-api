import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateAssociatedTaskDto, UpdateAssociatedTaskDto } from './dto';
import { AssociatedTasksService } from './associated-tasks.service';

@Controller('associated-tasks')
export class AssociatedTasksController {
  constructor(
    private readonly associatedTasksService: AssociatedTasksService,
  ) {}

  @Post()
  create(@Body() createAssociatedTaskDto: CreateAssociatedTaskDto) {
    return this.associatedTasksService.create(createAssociatedTaskDto);
  }

  @Post('seed')
  seed() {
    return this.associatedTasksService.seed();
  }

  @Get()
  findAll() {
    return this.associatedTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associatedTasksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociatedTaskDto: UpdateAssociatedTaskDto,
  ) {
    return this.associatedTasksService.update(+id, updateAssociatedTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.associatedTasksService.remove(+id);
  }
}
