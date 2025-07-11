import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ENV_DEVELOPMENT } from '@shared/constants';
import { durantionToTime, stringToDateWithTime } from '@shared/utils';
import { Evidence } from 'evidences/entities/evidence.entity';
import { User } from 'users/entities/user.entity';

const pathImage =
  process.env.NODE_ENV === ENV_DEVELOPMENT
    ? __dirname + '../../../public/static/images/evidences/'
    : 'https://api.comportarte.com/static/images/evidences/';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendCreate({
    user,
    evidenceCurrent,
  }: {
    user: User;
    evidenceCurrent: Evidence;
  }) {
    const { imgEvidence, manufacturingPlant, mainType } = evidenceCurrent;

    await this.mailerService.sendMail({
      to: user.email,
      from: `"Hada app (hallazgo nuevo)" <${this.configService.get(
        'MAIL_USER',
      )}>`,
      subject: manufacturingPlant.name + ' - ' + mainType.name,
      template:
        evidenceCurrent.mainType.name.toLocaleLowerCase() ===
        'comportamiento inseguro'
          ? './create-description'
          : './create',
      context: {
        id: evidenceCurrent.id,
        manufacturingPlant: evidenceCurrent.manufacturingPlant.name,
        mainType: evidenceCurrent.mainType.name,
        secondaryType: evidenceCurrent.secondaryType.name,
        zone: evidenceCurrent.zone.name,
        descripcion: evidenceCurrent.description,
        userWhoCreated: evidenceCurrent.user.name,
        createdAt: stringToDateWithTime(evidenceCurrent.createdAt),
        supervisor: evidenceCurrent.supervisors
          .map((supervisor) => supervisor.name)
          .join(' / '),
      },
      ...(imgEvidence && {
        attachments: [
          {
            filename: imgEvidence,
            path: pathImage + imgEvidence,
            cid: 'imgEvidence',
          },
        ],
      }),
    });
  }

  async sendSolution({
    user,
    evidenceCurrent,
  }: {
    user: User;
    evidenceCurrent: Evidence;
  }) {
    const { imgEvidence, manufacturingPlant, mainType, imgSolution } =
      evidenceCurrent;

    const attachments = [];

    if (imgEvidence) {
      attachments.push({
        filename: imgEvidence,
        path: pathImage + imgEvidence,
        cid: 'imgEvidence',
      });
    }

    if (imgSolution) {
      attachments.push({
        filename: imgSolution,
        path:
          __dirname + '../../../public/static/images/evidences/' + imgSolution,
        cid: 'imgSolution',
      });
    }

    await this.mailerService.sendMail({
      to: user.email,
      from: `"Hada app (hallazgo solucionado)" <${this.configService.get(
        'MAIL_USER',
      )}>`,
      subject: manufacturingPlant.name + ' - ' + mainType.name,
      template:
        evidenceCurrent.mainType.name.toLocaleLowerCase() ===
        'comportamiento inseguro'
          ? './solution-description'
          : './solution',
      context: {
        id: evidenceCurrent.id,
        manufacturingPlant: evidenceCurrent.manufacturingPlant.name,
        mainType: evidenceCurrent.mainType.name,
        secondaryType: evidenceCurrent.secondaryType.name,
        zone: evidenceCurrent.zone.name,
        descripcion: evidenceCurrent.description,
        descripcionSolucion: evidenceCurrent.descriptionSolution,
        userWhoCreated: evidenceCurrent.user.name,
        createdAt: stringToDateWithTime(evidenceCurrent.createdAt),
        supervisor: evidenceCurrent.supervisors
          .map((supervisor) => supervisor.name)
          .join(' / '),
        solutionDate: stringToDateWithTime(evidenceCurrent.solutionDate),
        durantionToTime: durantionToTime(
          evidenceCurrent.createdAt,
          evidenceCurrent.solutionDate,
        ),
      },
      attachments,
    });
  }

  async sendCancel({
    user,
    evidenceCurrent,
  }: {
    user: User;
    evidenceCurrent: Evidence;
  }) {
    const { imgEvidence, manufacturingPlant, mainType } = evidenceCurrent;

    await this.mailerService.sendMail({
      to: user.email,
      from: `"Hada app (hallazgo cancelado)" <${this.configService.get(
        'MAIL_USER',
      )}>`,
      subject: manufacturingPlant.name + ' - ' + mainType.name,
      template: './cancel',
      context: {
        id: evidenceCurrent.id,
        manufacturingPlant: evidenceCurrent.manufacturingPlant.name,
        mainType: evidenceCurrent.mainType.name,
        secondaryType: evidenceCurrent.secondaryType.name,
        zone: evidenceCurrent.zone.name,
        userWhoCreated: evidenceCurrent.user.name,
        createdAt: stringToDateWithTime(evidenceCurrent.createdAt),
        supervisor: evidenceCurrent.supervisors
          .map((supervisor) => supervisor.name)
          .join(' / '),
      },
      attachments: [
        {
          filename: imgEvidence,
          path: pathImage + imgEvidence,
          cid: 'imgEvidence',
        },
      ],
    });
  }
}
