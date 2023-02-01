import { IsMongoId, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  page: number;
  @IsOptional()
  limit: number;
  @IsOptional()
  start: string;
}

export class MongoIdDto {
  @IsMongoId()
  id: string;
}

export class MongoIdArrayDto {
  @IsMongoId({ each: true })
  ids: [string];
}
