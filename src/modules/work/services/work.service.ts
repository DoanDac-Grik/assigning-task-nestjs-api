import { Injectable } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  ZERO_OBJECT_ID,
} from '../../../common/common.constant';
import { User } from '../../user/models/user.model';
import { Status } from '../constants/work.consant';
import { CreateWorkDto, UpdateWorkDto } from '../dtos/work.dto';
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
  ) {
    const count = await this.workRepository.countDocuments({});
    const count_page = (count / limit).toFixed();

    const works = await this.workRepository.findByCondition(
      {
        _id: {
          $gt: isValidObjectId(start) ? start : ZERO_OBJECT_ID,
        },
      },
      null,
      { sort: { _id: 1 }, skip: (page - 1) * limit, limit: Number(limit) },
    );

    return { count, count_page, works };
  }

  async create(user: User, workDto: CreateWorkDto) {
    const work = { creator: user._id, status: Status.DOING, ...workDto };
    const new_work = await this.workRepository.create(work);
    return new_work;
  }

  async getById(id: string) {
    return this.workRepository.findById(id);
  }

  async update(id: string, data: UpdateWorkDto) {
    return await this.workRepository.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    await this.taskRepository.deleteByCondition({ workId: id });
    await this.workRepository.deleteOne(id);
    return true;
  }
}
