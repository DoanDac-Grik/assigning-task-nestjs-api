import { IsMongoId, IsNumberString, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumberString()
  page: number;
  @IsOptional()
  @IsNumberString()
  limit: number;
  @IsOptional()
  @IsMongoId()
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
