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

import { ConfigsTgService } from './configs-tg.service';
import {
  CreateConfigsTgDto,
  QueryConfigsTgDto,
  UpdateConfigsTgDto,
} from './dto';

@Controller('configs-tg')
export class ConfigsTgController {
  constructor(private readonly configsTgService: ConfigsTgService) {}

  @Post()
  create(@Body() createConfigsTgDto: CreateConfigsTgDto) {
    return this.configsTgService.create(createConfigsTgDto);
  }

  @Get()
  findAll(@Query() queryConfigsTgDto: QueryConfigsTgDto) {
    return this.configsTgService.findAll(queryConfigsTgDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configsTgService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigsTgDto: UpdateConfigsTgDto,
  ) {
    return this.configsTgService.update(+id, updateConfigsTgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configsTgService.remove(+id);
  }
}
