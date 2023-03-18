import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { Task, TaskModel } from '../models/task.model';

@Injectable()
export class TaskRepository extends BaseRepository<TaskModel, Task> {
  constructor(
    @InjectModel('TaskModel')
    private readonly taskModel: Model<TaskModel>,
  ) {
    super(taskModel);
  }
}
