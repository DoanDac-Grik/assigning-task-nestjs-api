import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';
import { UserModel, UserSchema } from './modules/user/models/user.model';
import { UserSeeder } from './modules/user/user.seed';
import * as dotenv from 'dotenv';
dotenv.config();
seeder({
  imports: [
    //TODO: Should not hard code
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get('MONGODB_URL'),
    //     useNewUrlParser: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
}).run([UserSeeder]);
