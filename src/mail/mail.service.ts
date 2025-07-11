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
  private MAIL_USER_APP: string = '';
  private FRONTEND_URL: string = '';

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.MAIL_USER_APP = this.configService.get<string>('email.user');
    this.FRONTEND_URL = this.configService.get<string>('frontendUrl');
  }

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
      from: `"Hada app (hallazgo creado)" <${this.MAIL_USER_APP}>`,
      subject: manufacturingPlant.name + ' - ' + mainType.name,
      template: './create',
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
      from: `"Hada app (hallazgo solucionado)" <${this.MAIL_USER_APP}>`,
      subject: manufacturingPlant.name + ' - ' + mainType.name,
      template: './solution',
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
      from: `"Hada app (hallazgo cancelado)" <${this.MAIL_USER_APP}>`,
      subject: manufacturingPlant.name + ' - ' + mainType.name,
      template: './cancel',
      context: {
        id: evidenceCurrent.id,
        manufacturingPlant: evidenceCurrent.manufacturingPlant.name,
        mainType: evidenceCurrent.mainType.name,
        secondaryType: evidenceCurrent.secondaryType.name,
        zone: evidenceCurrent.zone.name,
        userWhoCreated: evidenceCurrent.user.name,
        descripcion: evidenceCurrent.description,
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

  async sendForgotPassword(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      from: `"Hada app (restablecimiento de contraseña)" <${this.MAIL_USER_APP}>`,
      subject: 'Restablecimiento de contraseña',
      template: './forgot-password',
      context: {
        token,
        resetLink: `${this.FRONTEND_URL}?token=${token}`,
      },
    });
  }
}
