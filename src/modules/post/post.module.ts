import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { UserModule } from '../user/user.module';
import { CategoryController } from './controllers/category.controller';
import { PostController } from './controllers/post.controller';
import { CreatePostHandler } from './handlers/createPost.handler';
import { GetPostHandler } from './handlers/getPostHandler';
import { CategorySchema } from './models/category.model';
import { PostSchema } from './models/post.model';
import { CategoryRepository } from './repositories/category.repository';
import { PostRepository } from './repositories/post.repository';
import { CategoryService } from './services/category.service';
import { PostService } from './services/post.service';
import type { RedisClientOptions } from 'redis';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
    UserModule,
    CqrsModule,

    //Normal cache
    // CacheModule.register({
    //   ttl: 10000,
    // }),

    //Redis Cache
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => [
        {
          // isGlobal: true,
          //Warmning!!! redisStore.redisStore to access to store,
          //if not, it gets store.set() is not a function error
          store: redisStore.redisStore,
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          username: configService.get<string>('REDIS_USERNAME'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      ],
    }),
  ],
  controllers: [PostController, CategoryController],
  providers: [
    PostService,
    PostRepository,
    CategoryService,
    CategoryRepository,
    CreatePostHandler,
    GetPostHandler,
  ],
})
export class PostModule {}
