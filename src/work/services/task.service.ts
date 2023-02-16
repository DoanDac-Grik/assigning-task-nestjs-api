import { Injectable } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ZERO_OBJECT_ID } from '../../common/common.constant';
import { User } from '../../user/models/user.model';
import {
  AssignReviewerDto,
  AssignTaskDto,
  CreateTaskDto,
  UpdateTaskDto,
} from '../dtos/task.dto';
import { Stage } from '../constants/task.constant';
import { TaskRepository } from '../repositories/task.repository';
import { WorkRepository } from '../repositories/work.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly workRepository: WorkRepository,
  ) {}

  async getAll(page: number = 1, limit: number = 10, start: string) {
    const count = await this.taskRepository.countDocuments({});
    const count_page = (count / limit).toFixed();
    const tasks = await this.taskRepository.findByCondition(
      {
        _id: {
          $gt: isValidObjectId(start) ? start : ZERO_OBJECT_ID,
        },
      },
      null,
      { sort: { _id: 1 }, skip: (page - 1) * limit, limit: Number(limit) },
    );

    return { count, count_page, tasks };
  }

  async create(user: User, data: CreateTaskDto) {
    const task = { creator: user._id, stage: Stage.TODO, ...data };
    const new_task = await this.taskRepository.create(task);

    await this.workRepository.updateMany(
      { _id: { $in: data.workId } },
      {
        $push: {
          tasks: new_task._id,
        },
      },
    );

    return new_task;
  }

  async getById(id: string) {
    return this.taskRepository.findById(id);
  }

  // async getByCondition() {}

  async update(id: string, data: UpdateTaskDto) {
    return await this.taskRepository.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    const task = await this.taskRepository.findById(id);
    console.log(task);
    //TODO: Update exception filter, message error res
    await this.workRepository.updateMany(
      {
        _id: { $in: task.workId },
      },
      {
        $pull: {
          tasks: id,
        },
      },
    );
    await this.taskRepository.deleteOne(id);

    return true;
  }

  //TODO: Update exception filter, message error res
  async assign(id: string, data: AssignTaskDto) {
    await this.taskRepository.findByIdAndUpdate(id, data);
    return true;
  }

  async unAssign(id: string) {
    await this.taskRepository.findByIdAndUpdate(id, {
      $unset: { assignee: 1 },
    });
    return true;
  }

  async assignReviewer(id: string, data: AssignReviewerDto) {
    await this.taskRepository.findByIdAndUpdate(id, data);
    return true;
  }

  async unAssignReviewer(id: string) {
    await this.taskRepository.findByIdAndUpdate(id, {
      $unset: { reviewer: 1 },
    });
    return true;
  }
}
