import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from '../../mail/mail.service';

@Processor('send-mail')
export class EmailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('forgot-password')
  async forgotPasswordEmail(job: Job<{ email: string; link: string }>) {
    const { email, link } = job.data;
    await this.mailService.sendForgotPassword(email, link);
  }
}
