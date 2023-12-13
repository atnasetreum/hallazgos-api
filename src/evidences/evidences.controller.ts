import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { EvidencesService } from './evidences.service';
import { CreateEvidenceDto, UpdateEvidenceDto } from './dto';

@Controller('evidences')
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/static/images/evidences',
        filename(req, file, callback) {
          req;
          callback(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 2097152, //2 Megabytes
      },
    }),
  )
  create(
    @Body() createEvidenceDto: CreateEvidenceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.evidencesService.create(createEvidenceDto, file);
  }

  @Post('/solution/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/static/images/evidences',
        filename(req, file, callback) {
          req;
          callback(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 2097152, //2 Megabytes
      },
    }),
  )
  saveSolution(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.evidencesService.saveSolution(+id, file);
  }

  @Get()
  findAll() {
    return this.evidencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evidencesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvidenceDto: UpdateEvidenceDto,
  ) {
    return this.evidencesService.update(+id, updateEvidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evidencesService.remove(+id);
  }
}
