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

import { AssociatedTasksService } from './associated-tasks.service';
import {
  CreateAssociatedTaskDto,
  FiltersAssociatedTaskDto,
  UpdateAssociatedTaskDto,
} from './dto';

@Controller('associated-tasks')
export class AssociatedTasksController {
  constructor(
    private readonly associatedTasksService: AssociatedTasksService,
  ) {}

  @Post()
  create(@Body() createAssociatedTaskDto: CreateAssociatedTaskDto) {
    return this.associatedTasksService.create(createAssociatedTaskDto);
  }

  @Get()
  findAll(@Query() filtersAssociatedTaskDto: FiltersAssociatedTaskDto) {
    return this.associatedTasksService.findAll(filtersAssociatedTaskDto);
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
