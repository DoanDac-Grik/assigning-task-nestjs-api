import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        // Need to add to .env
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      defaults: {
        from: 'noreply@example.com',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
