import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { durantionToTime, stringToDateWithTime } from '@shared/utils';
import { Evidence } from 'evidences/entities/evidence.entity';
import { User } from 'users/entities/user.entity';

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
      template: './create',
      context: {
        id: evidenceCurrent.id,
        manufacturingPlant: evidenceCurrent.manufacturingPlant.name,
        mainType: evidenceCurrent.mainType.name,
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
          path:
            __dirname +
            '../../../public/static/images/evidences/' +
            imgEvidence,
          cid: 'imgEvidence',
        },
      ],
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

    await this.mailerService.sendMail({
      to: user.email,
      from: `"Hada app (hallazgo solucionado)" <${this.configService.get(
        'MAIL_USER',
      )}>`,
      subject: manufacturingPlant.name + ' - ' + mainType.name,
      template: './solution',
      context: {
        id: evidenceCurrent.id,
        manufacturingPlant: evidenceCurrent.manufacturingPlant.name,
        mainType: evidenceCurrent.mainType.name,
        zone: evidenceCurrent.zone.name,
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
      attachments: [
        {
          filename: imgEvidence,
          path:
            __dirname +
            '../../../public/static/images/evidences/' +
            imgEvidence,
          cid: 'imgEvidence',
        },

        {
          filename: imgSolution,
          path:
            __dirname +
            '../../../public/static/images/evidences/' +
            imgSolution,
          cid: 'imgSolution',
        },
      ],
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
          path:
            __dirname +
            '../../../public/static/images/evidences/' +
            imgEvidence,
          cid: 'imgEvidence',
        },
      ],
    });
  }
}
