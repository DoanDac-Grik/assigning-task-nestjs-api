import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './controllers/task.controller';
import { WorkController } from './controllers/work.controller';
import { TaskSchema } from './models/task.model';
import { WorkSchema } from './models/work.model';
import { TaskRepository } from './repositories/task.repository';
import { WorkRepository } from './repositories/work.repository';
import { TaskService } from './services/task.service';
import { WorkService } from './services/work.service';
// import { WorksController } from './controllers/work.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'Work', schema: WorkSchema },
    ]),
  ],
  controllers: [TaskController, WorkController],
  providers: [TaskService, TaskRepository, WorkService, WorkRepository],
})
export class WorkModule {}
