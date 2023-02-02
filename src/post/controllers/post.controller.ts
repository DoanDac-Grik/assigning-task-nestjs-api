import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  MongoIdArrayDto,
  MongoIdDto,
  PaginationQueryDto,
} from '../../common/common.dto';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostService } from '../services/post.service';
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/categories')
  async getByCategories(@Query() { ids }: MongoIdArrayDto) {
    return await this.postService.getByCategories(ids);
  }

  //NOTE: when using dto class to validate, declaring { query} instead of
  //declare params or query in @Query()
  @Get('/category')
  async getByCategory(@Query() { id }: MongoIdDto) {
    console.log(typeof id);
    return await this.postService.getByCategory(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/all')
  async getPostUser(@Req() req) {
    await req.user.populate({
      path: 'posts',
      // select: 'title',
    });

    return req.user.posts;
  }

  @Get()
  getAllPost(@Query() { page, limit, start }: PaginationQueryDto) {
    return this.postService.getAllPosts(page, limit, start);
  }

  //NOTE: Với các params, khi nhận vào vẫn cần khi báo trong @Param, lúc này id sẽ có
  //kiểu theo Dto, cần .toString() để đưa về kiểu string
  @Get('/:id')
  async getPostById(@Param('id') id: MongoIdDto) {
    return this.postService.getPostById(id.toString());
  }

  @Post()
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(req.user, post);
  }

  @Put('/:id')
  async updatePost(@Body() update: UpdatePostDto, @Param('id') id: MongoIdDto) {
    return this.postService.updatePost(id.toString(), update);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: MongoIdDto) {
    this.postService.deletePost(id.toString());
    return true;
  }
}
