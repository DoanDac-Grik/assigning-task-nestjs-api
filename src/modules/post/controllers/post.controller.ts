import {
  Body,
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs/dist';
import { AuthGuard } from '@nestjs/passport';
import {
  MongoIdArrayDto,
  MongoIdDto,
  PaginationQueryDto,
} from '../../../common/common.dto';
import { CreatePostCommand } from '../commands/createPost.command';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { GetPostQuery } from '../queries/getPost.query';
import { PostService } from '../services/post.service';
import { Cache } from 'cache-manager';
import { RequestWithUser } from '../../../common/common.interface';
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
  async getPostById(@Param() postIdDto: MongoIdDto) {
    return this.postService.getPostById(postIdDto.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Req() req: RequestWithUser, @Body() post: CreatePostDto) {
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

  //TODO: sau này làm lại một module khác về cqrs cho hoàn chỉnh, đây đang chung chạ
  @UseGuards(AuthGuard('jwt'))
  @Post('create-by-command')
  async createPostByCommand(
    @Req() req: RequestWithUser,
    @Body() post: CreatePostDto,
  ) {
    return this.commandBus.execute(new CreatePostCommand(req.user, post));
  }

  @Get(':id/get-by-query')
  async getPostByQuery(@Param() id: MongoIdDto) {
    return this.queryBus.execute(new GetPostQuery(id.id));
  }

  //Learning cache
  @UseInterceptors(CacheInterceptor)
  @Get(':id/get-with-cache')
  async getPostWithCache(@Param() postIdDto: MongoIdDto) {
    console.log('ok');
    return (await this.postService.getPostById(postIdDto.id)).toJSON();
  }

  @Get('cache/demo/set-cache')
  async demoSetCache() {
    await this.cacheManager.set('ok', 'hello world', 1000);
    return true;
  }

  @UseInterceptors(CacheInterceptor)
  @Get('cache/demo/get-cache')
  async demoGetCache() {
    return await this.cacheManager.get('ok');
  }
}
