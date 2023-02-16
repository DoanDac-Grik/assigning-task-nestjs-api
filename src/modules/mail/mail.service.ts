import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendForgotPassword(email: string, link: string) {
    await this.mailService.sendMail({
      from: '18520551@gm.uit.edu.vn',
      to: email,
      subject: 'Forgot Password',
      template: './forgot-password',
      context: {
        name: email,
        link: link,
      },
    });
    return true;
  }

  async sendAssignTask(email: string, assigneeName: string, taskName: string) {
    await this.mailService.sendMail({
      from: '18520551@gm.uit.edu.vn',
      to: email,
      subject: 'Task Assignment',
      template: './task-assignment',
      context: {
        assigneeName,
        taskName,
      },
    });
    return true;
  }

  async sendAssignReviewer(
    email: string,
    reviewerName: string,
    taskName: string,
  ) {
    await this.mailService.sendMail({
      from: '18520551@gm.uit.edu.vn',
      to: email,
      subject: 'Reviewer Assignment',
      template: './reviewer-assignment',
      context: {
        reviewerName,
        taskName,
      },
    });
    return true;
  }
}
