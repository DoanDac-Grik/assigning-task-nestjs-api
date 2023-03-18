import { HttpStatus, Injectable } from '@nestjs/common';
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
import { Status } from '../constants/work.consant';
import { CreateWorkDto, UpdateWorkDto } from '../dtos/work.dto';
import { Work } from '../models/work.model';
import { TaskRepository } from '../repositories/task.repository';
import { WorkRepository } from '../repositories/work.repository';

@Injectable()
export class WorkService {
  constructor(
    private readonly workRepository: WorkRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async getAll(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_PAGE_SIZE,
    start: string,
  ): Promise<Response<IPaginationResponse<Work[]>>> {
    const count = await this.workRepository.countDocuments({});
    const total_page = Math.round(count / limit);

    const works = await this.workRepository.findByCondition(
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
      message: 'Get all works successfully',
      data: { count, total_page, data: works },
    };
  }

  async create(user: User, workDto: CreateWorkDto): Promise<Response<Work>> {
    const work = { creator: user._id, status: Status.DOING, ...workDto };
    const new_work = await this.workRepository.create(work);
    return {
      statusCode: HttpStatus.OK,
      message: 'Work created successfully',
      data: new_work,
    };
  }

  async getById(id: string): Promise<Response<Work>> {
    const work = await this.workRepository.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get work successfully',
      data: work,
    };
  }

  async update(id: string, data: UpdateWorkDto): Promise<Response<null>> {
    try {
      await this.workRepository.findByIdAndUpdate(id, data);
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
    try {
      await this.taskRepository.deleteByCondition({ workId: id });
      await this.workRepository.deleteOne(id);
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
}
