import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../common/base.repository';
import { Media } from '../models/media.model';

@Injectable()
export class MediaRepository extends BaseRepository<Media> {
  constructor(@InjectModel('Media') private readonly mediaModel: Model<Media>) {
    super(mediaModel);
  }
}
