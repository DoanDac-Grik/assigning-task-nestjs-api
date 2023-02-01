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
  CreatePostDto,
  PaginationPostDto,
  UpdatePostDto,
} from '../dto/post.dto';
import { PostService } from '../services/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/categories')
  async getByCategories(@Query('ids') ids) {
    return await this.postService.getByCategories(ids);
  }

  @Get('/category')
  async getByCategory(@Query('id') id) {
    return await this.postService.getByCategory(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/all')
  async getPostUser(@Req() req: any) {
    await req.user.populate({
      path: 'posts',
      // select: 'title',
    });

    return req.user.posts;
  }

  @Get()
  getAllPost(@Query() { page, limit, start }: PaginationPostDto) {
    return this.postService.getAllPosts(page, limit, start);
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(req.user, post);
  }

  @Put('/:id')
  async updatePost(@Body() update: UpdatePostDto, @Param('id') id: string) {
    return this.postService.updatePost(id, update);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    this.postService.deletePost(id);
    return true;
  }
}
