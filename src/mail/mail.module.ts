import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          auth: {
            user: configService.get('MAIL_AUTH_USER'),
            pass: configService.get('MAIL_AUTH_PASS'),
          },
        },
        defaults: {
          from: configService.get('MAIL_FROM'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
        },
      }),
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
