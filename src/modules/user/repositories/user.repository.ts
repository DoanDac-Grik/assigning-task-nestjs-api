import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { User, UserModel } from '../models/user.model';

export class UserRepository extends BaseRepository<UserModel, User> {
  constructor(
    @InjectModel('UserModel')
    private readonly userModel: Model<UserModel>,
  ) {
    super(userModel);
  }
}
