import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async getAll() {
    return await this.categoryRepository.findAll();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async getPosts(category_id: string) {
    return await this.postRepository.findByCondition({
      //NOTE: { $elemMatch: { $eq: category_id } } tìm các phần tử trong mảng ($elementMatch)
      //mà bằng ( $eq) với category_id
      categories: { $elemMatch: { $eq: category_id } },
    });
  }
}
