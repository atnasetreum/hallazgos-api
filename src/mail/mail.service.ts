import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { stringToDateWithTime } from '@shared/utils';
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
    responsible,
  }: {
    user: User;
    evidenceCurrent: Evidence;
    responsible: User;
  }) {
    const { imgEvidence, manufacturingPlant, mainType } = evidenceCurrent;

    await this.mailerService.sendMail({
      to: user.email,
      from: `"Hada app (nuevo hallazgo)" <${this.configService.get(
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
        responsible: responsible.name,
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
