import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { EvidencesService } from './evidences.service';
import { CreateEvidenceDto, UpdateEvidenceDto } from './dto';
import { diskStorage } from 'multer';

@Controller('evidences')
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
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
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.evidencesService.create(createEvidenceDto, files);
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
