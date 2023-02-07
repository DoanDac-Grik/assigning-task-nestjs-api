import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
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
