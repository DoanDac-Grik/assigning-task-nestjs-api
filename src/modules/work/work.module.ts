import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskMailConsumer } from '../../consumers/email.comsumer';
import { MailService } from '../mail/mail.service';
import { TaskController } from './controllers/task.controller';
import { WorkController } from './controllers/work.controller';
import { TaskSchema } from './models/task.model';
import { WorkSchema } from './models/work.model';
import { TaskRepository } from './repositories/task.repository';
import { WorkRepository } from './repositories/work.repository';
import { TaskService } from './services/task.service';
import { WorkService } from './services/work.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TaskModel', schema: TaskSchema },
      { name: 'WorkModel', schema: WorkSchema },
    ]),
    BullModule.registerQueue({
      name: 'task-mail',
    }),
  ],
  controllers: [TaskController, WorkController],
  providers: [
    TaskService,
    TaskRepository,
    WorkService,
    WorkRepository,
    TaskMailConsumer,
    MailService,
  ],
})
export class WorkModule {}
