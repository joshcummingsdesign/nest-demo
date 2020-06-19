import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { EConfigOptions } from '../config';

@Injectable()
export class EmailService {
  private ses: AWS.SES;

  constructor(private configService: ConfigService) {
    this.sesInit();
  }

  private sesInit(): void {
    AWS.config.update({
      credentials: new AWS.Credentials({
        accessKeyId: this.configService.get<string>(
          EConfigOptions.AWS_ACCESS_KEY_ID,
        ),
        secretAccessKey: this.configService.get<string>(
          EConfigOptions.AWS_SECRET_ACCESS_KEY,
        ),
      }),
      region: this.configService.get<string>(EConfigOptions.AWS_SES_REGION),
    });

    this.ses = new AWS.SES();
  }

  public async sendEmail(
    to: string,
    template: string,
    data?: object,
  ): Promise<{ messageId: string }> {
    const message = await this.ses
      .sendTemplatedEmail({
        Destination: { ToAddresses: [to] },
        Source: this.configService.get<string>(EConfigOptions.AWS_SES_EMAIL),
        Template: template,
        TemplateData: JSON.stringify(data),
      })
      .promise();

    return { messageId: message.MessageId };
  }
}
