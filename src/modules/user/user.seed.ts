import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DataFactory, Seeder } from 'nestjs-seeder';
import { User, UserModel } from './models/user.model';
import Role from './role.enum';

const user_seeds = [
  {
    email: 'admin@gmail.com',
    password: '$2b$10$cglHGx1yj.z.12yMsbNowOIlzQ/zgQCupk2WwM2lh/T2Ym4rZb88e',
    name: 'admin',
    roles: [Role.User, Role.Admin],
  },
  {
    email: 'user1@gmail.com',
    password: '$2b$10$cglHGx1yj.z.12yMsbNowOIlzQ/zgQCupk2WwM2lh/T2Ym4rZb88e',
    name: 'user 1',
    roles: [Role.User],
  },
  {
    email: 'user2@gmail.com',
    password: '$2b$10$cglHGx1yj.z.12yMsbNowOIlzQ/zgQCupk2WwM2lh/T2Ym4rZb88e',
    name: 'user 2',
    roles: [Role.User],
  },
];

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel, User>,
  ) {}

  async seed(): Promise<any> {
    // Generate 4 jokes.
    for (let i = 0; i < 3; i++) {
      const users = DataFactory.createForClass(UserModel).generate(
        1,
        user_seeds[i],
      );
      await this.userModel.create(users);
    }
    return;
  }

  async drop(): Promise<any> {
    return this.userModel.deleteMany({});
  }
}
