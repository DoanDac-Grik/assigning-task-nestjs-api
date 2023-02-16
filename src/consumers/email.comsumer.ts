import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from '../modules/mail/mail.service';

@Processor('task-mail')
export class TaskMailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('assign-task')
  async assignTaskEmail(
    job: Job<{ email: string; assigneeName: string; taskName: string }>,
  ) {
    const { email, assigneeName, taskName } = job.data;
    await this.mailService.sendAssignTask(email, assigneeName, taskName);
  }

  @Process('assign-reviewer')
  async assignReviewerEmail(
    job: Job<{ email: string; reviewerName: string; taskName: string }>,
  ) {
    const { email, reviewerName, taskName } = job.data;
    await this.mailService.sendAssignReviewer(email, reviewerName, taskName);
  }
}

@Processor('auth-mail')
export class AuthMailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('forgot-password')
  async forgotPasswordEmail(job: Job<{ email: string; link: string }>) {
    const { email, link } = job.data;
    await this.mailService.sendForgotPassword(email, link);
  }
}
