import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { seeder } from 'nestjs-seeder';
import { UserModel, UserSchema } from './modules/user/models/user.model';
import { UserSeeder } from './modules/user/user.seed';
dotenv.config();
seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
}).run([UserSeeder]);
