import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateWorkingDayDto, UpdateWorkingDayDto } from './dto';
import { WorkingDaysService } from './working-days.service';

@Controller('working-days')
export class WorkingDaysController {
  constructor(private readonly workingDaysService: WorkingDaysService) {}

  @Post()
  create(@Body() createWorkingDayDto: CreateWorkingDayDto) {
    return this.workingDaysService.create(createWorkingDayDto);
  }

  @Get()
  findAll() {
    return this.workingDaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workingDaysService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkingDayDto: UpdateWorkingDayDto,
  ) {
    return this.workingDaysService.update(+id, updateWorkingDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workingDaysService.remove(+id);
  }
}
