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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { EvidencesService } from './evidences.service';
import {
  CommentEvidenceDto,
  CreateEvidenceDto,
  QueryEvidenceDto,
  UpdateEvidenceDto,
} from './dto';

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

  @Post('/add/comment/:id')
  addComment(@Param('id') id: string, @Body() comment: CommentEvidenceDto) {
    return this.evidencesService.addComment(+id, comment);
  }

  @Get()
  findAll(@Query() queryEvidenceDto: QueryEvidenceDto) {
    return this.evidencesService.findAll(queryEvidenceDto);
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
