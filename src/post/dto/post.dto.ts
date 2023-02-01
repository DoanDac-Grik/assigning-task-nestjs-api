import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  description: string;
  @IsOptional()
  content: string;
  @IsOptional()
  author: string;
  @IsOptional()
  tags: string[];
  @IsOptional()
  numbers: number[];
  @IsOptional()
  categories: string[];
}

export class UpdatePostDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  description: string;
  @IsOptional()
  content: string;
}

export class PaginationPostDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  start: string;
}
