import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { Work } from '../models/work.model';

@Injectable()
export class WorkRepository extends BaseRepository<Work> {
  constructor(@InjectModel('Work') private readonly workModel: Model<Work>) {
    super(workModel);
  }
}
