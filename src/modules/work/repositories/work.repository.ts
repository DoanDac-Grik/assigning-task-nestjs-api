import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../common/base.repository';
import { Work, WorkModel } from '../models/work.model';

@Injectable()
export class WorkRepository extends BaseRepository<WorkModel, Work> {
  constructor(
    @InjectModel('WorkModel') private readonly workModel: Model<WorkModel>,
  ) {
    super(workModel);
  }
}
