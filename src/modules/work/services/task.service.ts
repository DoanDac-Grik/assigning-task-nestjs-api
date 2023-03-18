import { InjectQueue } from '@nestjs/bull';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Queue } from 'bull';
import { isValidObjectId } from 'mongoose';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  ZERO_OBJECT_ID,
} from '../../../common/common.constant';
import {
  IPaginationResponse,
  Response,
} from '../../../common/common.interface';
import { User } from '../../user/models/user.model';
import { Stage } from '../constants/task.constant';
import {
  AssignReviewerDto,
  AssignTaskDto,
  CreateTaskDto,
  UpdateTaskDto,
} from '../dtos/task.dto';
import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';
import { WorkRepository } from '../repositories/work.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly workRepository: WorkRepository,
    @InjectQueue('task-mail') private sendMail: Queue,
  ) {}

  async getAll(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_PAGE_SIZE,
    start: string,
  ): Promise<Response<IPaginationResponse<Task[]>>> {
    const count = await this.taskRepository.countDocuments({});
    const total_page = Math.round(count / limit);

    const tasks = await this.taskRepository.findByCondition(
      {
        _id: {
          $gt: isValidObjectId(start) ? start : ZERO_OBJECT_ID,
        },
      },
      null,
      { sort: { _id: 1 }, skip: (page - 1) * limit, limit: Number(limit) },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Get all tasks completed',
      data: {
        count: count,
        total_page: total_page,
        data: tasks,
      },
    };
  }

  async create(user: User, data: CreateTaskDto): Promise<Response<Task>> {
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

  async getById(id: string): Promise<Response<Task>> {
    const task = await this.taskRepository.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get detail task successfully',
      data: task,
    };
  }

  // async getByCondition() {}

  async update(id: string, data: UpdateTaskDto): Promise<Response<null>> {
    try {
      await this.taskRepository.findByIdAndUpdate(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Update successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail to update',
        error: error,
      };
    }
  }

  async delete(id: string): Promise<Response<null>> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new HttpException('Not found task', HttpStatus.BAD_REQUEST);
    }

    //TODO: Update exception filter, message error res
    try {
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

      return {
        statusCode: HttpStatus.OK,
        message: 'Delete successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail to delete',
        error: error,
      };
    }
  }

  //TODO: Double check here
  async assign(id: string, data: AssignTaskDto): Promise<Response<null>> {
    try {
      await this.taskRepository.findByIdAndUpdate(id, data);
      const updated_task = await this.taskRepository.findById(id);

      if (updated_task) {
        await updated_task.populate({ path: 'assignee', select: 'name email' });
      } else {
        throw new NotFoundException(id);
      }
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

      return {
        statusCode: HttpStatus.OK,
        message: 'Assign task successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail to assign task',
        error: error,
      };
    }
  }

  async unAssign(id: string): Promise<Response<null>> {
    try {
      await this.taskRepository.findByIdAndUpdate(id, {
        $unset: { assignee: 1 },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Unassign task successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail to unassign task',
        error: error,
      };
    }
  }

  //TODO: Double check here
  async assignReviewer(
    id: string,
    data: AssignReviewerDto,
  ): Promise<Response<null>> {
    try {
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

      return {
        statusCode: HttpStatus.OK,
        message: 'Assign reviewer successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail to unassign task',
        error: error,
      };
    }
  }

  async unAssignReviewer(id: string): Promise<Response<null>> {
    try {
      await this.taskRepository.findByIdAndUpdate(id, {
        $unset: { reviewer: 1 },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Unassign reviewer successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail to unassign reviewer',
        error: error,
      };
    }
  }
}
