import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TypeEvidencesService } from './type-evidences.service';
import { CreateTypeEvidenceDto, UpdateTypeEvidenceDto } from './dto';

@Controller('type-evidences')
export class TypeEvidencesController {
  constructor(private readonly typeEvidencesService: TypeEvidencesService) {}

  @Post()
  create(@Body() createTypeEvidenceDto: CreateTypeEvidenceDto) {
    return this.typeEvidencesService.create(createTypeEvidenceDto);
  }

  @Get()
  findAll() {
    return this.typeEvidencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeEvidencesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeEvidenceDto: UpdateTypeEvidenceDto,
  ) {
    return this.typeEvidencesService.update(+id, updateTypeEvidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeEvidencesService.remove(+id);
  }
}
