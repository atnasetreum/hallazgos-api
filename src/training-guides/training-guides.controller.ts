import { join } from 'path';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';

import * as XlsxPopulate from 'xlsx-populate';
import { writeFile } from 'fs/promises';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';

import { TrainingGuidesService } from './training-guides.service';
import {
  CreateTrainingGuideDto,
  SaveTrainingGuideEmployeeDto,
  SaveTrainingGuideEmployeeSignatureDto,
  UpdateTrainingGuideDto,
} from './dto';

@Controller('training-guides')
export class TrainingGuidesController {
  private readonly filePath: string = join(
    process.cwd(),
    'src/files',
    'geOperarioGeneral.xlsx',
  );

  private readonly filePathNewFile = join(
    process.cwd(),
    'src/files',
    'archivo_actualizado_geOperarioGeneral.xlsx',
  );

  private readonly imageBannerPath = join(
    process.cwd(),
    'src/files',
    'bannerGuiaEntrenamiento.png',
  );

  constructor(private readonly trainingGuidesService: TrainingGuidesService) {}

  @Post()
  create(@Body() createTrainingGuideDto: CreateTrainingGuideDto) {
    return this.trainingGuidesService.create(createTrainingGuideDto);
  }

  @Post('training-guide-employee')
  saveTrainingGuideEmployee(
    @Body() saveTrainingGuideEmployeeDto: SaveTrainingGuideEmployeeDto,
  ) {
    return this.trainingGuidesService.saveTrainingGuideEmployee(
      saveTrainingGuideEmployeeDto,
    );
  }

  @Post('training-guide-employee/signature/:id')
  saveTrainingGuideEmployeeSignature(
    @Param('id') id: string,
    @Body()
    saveTrainingGuideEmployeeSignatureDto: SaveTrainingGuideEmployeeSignatureDto,
  ) {
    return this.trainingGuidesService.saveTrainingGuideEmployeeSignature(
      +id,
      saveTrainingGuideEmployeeSignatureDto,
    );
  }

  @Post('seed')
  seed() {
    return this.trainingGuidesService.seed();
  }

  @Get()
  findAll() {
    return this.trainingGuidesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingGuidesService.findOne(+id);
  }

  @Get('download/file/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const data =
      await this.trainingGuidesService.findOneTrainingGuideEmployee(+id);

    XlsxPopulate.fromFileAsync(this.filePath)
      .then(async (workbook) => {
        const sheet = workbook.sheet('Guia entrenamiento Ver. 04 (2)');

        const currentIdxInitial = 4;

        sheet.cell(`A${currentIdxInitial}`).value(data.user.name);
        sheet.cell(`C${currentIdxInitial}`).value(
          data.startDate.toISOString().slice(0, 10),
          /* .split('-')
              .reverse()
              .join('/') */
        );
        sheet.cell(`E${currentIdxInitial}`).value(data.position.name);
        sheet.cell(`G${currentIdxInitial}`).value(data.area.name);

        for (const [idx, evaluation] of data.evaluations.entries()) {
          const currentIdx = 6 + idx;
          sheet.cell(`A${currentIdx}`).value(evaluation.topic.name);
          sheet.cell(`C${currentIdx}`).value(evaluation.evaluationDate);
          sheet.cell(`D${currentIdx}`).value(evaluation.topic.duration);
          sheet
            .cell(`E${currentIdx}`)
            .value(
              evaluation.topic.responsibles
                .map((responsible) => responsible.name)
                .join(' / '),
            );
          sheet
            .cell(`F${currentIdx}`)
            .value(
              evaluation.topic.typeOfEvaluation === 'boolean'
                ? evaluation.evaluationValue === 'true'
                  ? 'Aprobado'
                  : 'Reprobado'
                : evaluation.evaluationValue,
            );
          sheet.cell(`H${currentIdx}`).value(evaluation.observations);
        }
        return workbook.toFileAsync(this.filePathNewFile);
      })
      .then(async () => {
        const workbook = new ExcelJS.Workbook();

        const dimensions = { width: 120, height: 50 };

        await workbook.xlsx.readFile(this.filePathNewFile).then(async () => {
          const worksheet = workbook.worksheets[0];

          worksheet.pageSetup.printArea = 'A1:I32';

          //worksheet.getColumn('A').width = 20;

          if (data.signatureEmployee) {
            const base64 = Buffer.from(
              data.signatureEmployee.split(',')[1],
              'base64',
            );

            const imagePath = join(
              process.cwd(),
              'src/files',
              `signatureEmployee-temp-image.png`,
            );

            await writeFile(imagePath, base64);

            const imageId = workbook.addImage({
              filename: imagePath,
              extension: 'png',
            });

            for (const [idx, _] of data.evaluations.entries()) {
              const currentIdx = 5 + idx;
              //worksheet.getRow(currentIdx).height = 30;
              worksheet.addImage(imageId, {
                tl: { col: 6, row: currentIdx },
                ext: { width: 100, height: 30 },
              });
            }

            worksheet.addImage(imageId, {
              tl: { col: 1, row: 27 },
              ext: dimensions,
            });
          }

          if (data.signatureAreaManager) {
            const base64 = Buffer.from(
              data.signatureAreaManager.split(',')[1],
              'base64',
            );

            const imagePath = join(
              process.cwd(),
              'src/files',
              `signatureAreaManager-temp-image.png`,
            );

            await writeFile(imagePath, base64);

            const imageId = workbook.addImage({
              filename: imagePath,
              extension: 'png',
            });

            worksheet.addImage(imageId, {
              tl: { col: 4, row: 27 },
              ext: dimensions,
            });
          }

          if (data.signatureHumanResourceManager) {
            const base64 = Buffer.from(
              data.signatureHumanResourceManager.split(',')[1],
              'base64',
            );

            const imagePath = join(
              process.cwd(),
              'src/files',
              `signatureHumanResourceManager-temp-image.png`,
            );

            await writeFile(imagePath, base64);

            const imageId = workbook.addImage({
              filename: imagePath,
              extension: 'png',
            });

            worksheet.addImage(imageId, {
              tl: { col: 7, row: 27 },
              ext: dimensions,
            });
          }

          const imageIdBanner = workbook.addImage({
            filename: this.imageBannerPath,
            extension: 'png',
          });

          worksheet.addImage(imageIdBanner, {
            tl: { col: 0, row: 0 },
            ext: { width: 125, height: 74 },
          });

          await workbook.xlsx.writeFile(this.filePathNewFile);

          return 'ok';
        });

        res.download(this.filePathNewFile, (err) => {
          if (err) {
            res.status(500).send('Error al descargar el archivo');
          }
        });
      })
      .catch((err) => {
        console.error('Error al procesar el archivo:', err);
        res.status(500).send('Error al procesar el archivo');
      });
  }

  @Get('position/:positionId/employee/:employeeId')
  findOneByPositionIdAndEmployeeId(
    @Param('positionId') positionId: string,
    @Param('employeeId') employeeId: string,
  ) {
    return this.trainingGuidesService.findOneByPositionIdAndEmployeeId(
      +positionId,
      +employeeId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainingGuideDto: UpdateTrainingGuideDto,
  ) {
    return this.trainingGuidesService.update(+id, updateTrainingGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingGuidesService.remove(+id);
  }
}
