import { Injectable, NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/services/user.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,

    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllPosts(page: number = 1, limit: number = 10, start: string) {
    const count = await this.postRepository.countDocuments({});
    const count_page = (count / limit).toFixed();
    const posts = await this.postRepository.findByCondition(
      {
        _id: {
          $gt: isValidObjectId(start) ? start : '000000000000000000000000',
        },
      },
      null,
      {
        sort: {
          _id: 1,
        },
        skip: (page - 1) * limit,
        limit: Number(limit),
      },
    );
    return { count_page, posts };
  }

  async getPostById(post_id: string) {
    const post = await this.postRepository.findById(post_id);

    if (post) {
      await post
        // .populate({ path: 'user', select: '-password -refreshToken' })
        // .populate({ path: 'user', select: 'name email' })
        // .populate('categories')
        .populate([
          { path: 'user', select: 'name email' },
          {
            path: 'categories',
            match: {
              _id: '62fd1a9473adb27682f0f440',
            },
            select: 'title',
            options: { limit: 100, sort: { name: 1 } },
            // populate: [{
            //   path: '',
            // },]
          },
        ]);
      // .execPopulate();
      // console.log(post.populated('user'));
      // post.depopulate('user');
      // console.log(post.populated('user'));
      return post;
    } else {
      throw new NotFoundException(post_id);
      // throw new PostNotFoundException(post_id);
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async updatePost(post_id: string, data: UpdatePostDto) {
    return await this.postRepository.findByIdAndUpdate(post_id, data);
  }

  async createPost(user: User, post: CreatePostDto) {
    post.author = user._id;
    const new_post = await this.postRepository.create(post);
    if (post.categories) {
      await this.categoryRepository.updateMany(
        {
          _id: { $in: post.categories },
        },
        {
          $push: {
            posts: new_post._id,
          },
        },
      );
    }
    return new_post;
  }

  async getByCategory(category_id: string) {
    return await this.postRepository.findByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: [string]) {
    return await this.postRepository.findByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }

  async deletePost(post_id: string) {
    return await this.postRepository.deleteOne(post_id);
  }
}
