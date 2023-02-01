import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { User } from '../models/user.model';

export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
