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

  async getPosts(category_id) {
    return await this.postRepository.findByCondition({
      categories: { $elemMatch: { $eq: category_id } },
    });
  }
}
