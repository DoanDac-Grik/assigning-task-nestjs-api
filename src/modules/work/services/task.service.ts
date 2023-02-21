import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Queue } from 'bull';
import { isValidObjectId } from 'mongoose';
import { ZERO_OBJECT_ID } from '../../../common/common.constant';
import { User } from '../../user/models/user.model';
import { Stage } from '../constants/task.constant';
import {
  AssignReviewerDto,
  AssignTaskDto,
  CreateTaskDto,
  UpdateTaskDto,
} from '../dtos/task.dto';
import { TaskRepository } from '../repositories/task.repository';
import { WorkRepository } from '../repositories/work.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly workRepository: WorkRepository,
    @InjectQueue('task-mail') private sendMail: Queue,
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

    //TODO: promise all
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
    const updated_task = await this.taskRepository.findById(id);

    if (updated_task) {
      await updated_task.populate({ path: 'assignee', select: 'name email' });
    } else {
      throw new NotFoundException(id);
    }

    const dkm = await this.sendMail.getCompleted();
    console.log('okok', dkm);
    await this.sendMail.add(
      'assign-task',
      {
        email: updated_task.assignee.email,
        assigneeName: updated_task.assignee.name,
        taskName: updated_task.title,
      },
      {
        //Remove it from queue when completed
        removeOnComplete: true,
      },
    );
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
    const updated_task = await this.taskRepository.findById(id);
    if (updated_task) {
      await updated_task.populate({ path: 'reviewer', select: 'name email' });
    } else {
      throw new NotFoundException(id);
    }

    await this.sendMail.add(
      'assign-reviewer',
      {
        email: updated_task.reviewer.email,
        reviewerName: updated_task.reviewer.name,
        taskName: updated_task.title,
      },
      {
        //Remove it from queue when completed
        removeOnComplete: true,
      },
    );
    return true;
  }

  async unAssignReviewer(id: string) {
    await this.taskRepository.findByIdAndUpdate(id, {
      $unset: { reviewer: 1 },
    });
    return true;
  }
}
