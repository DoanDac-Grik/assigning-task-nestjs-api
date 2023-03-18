import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../common/base.repository';
import { Media, MediaModel } from '../models/media.model';

@Injectable()
export class MediaRepository extends BaseRepository<MediaModel, Media> {
  constructor(
    @InjectModel('MediaModel') private readonly mediaModel: Model<MediaModel>,
  ) {
    super(mediaModel);
  }
}
