import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumberString, IsOptional } from 'class-validator';
import { Response } from './common.interface';

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

// For Swagger Response
export class BadRequestResponse implements Response<null> {
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({ example: 'Bad Request' })
  message: string;
}

export class ForbidenResponse implements Response<null> {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Forbiden!' })
  message: string;
}

export class UnAuthResponse implements Response<null> {
  @ApiProperty({ example: 401 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized!' })
  message: string;
}

export class InternalErrorResponse implements Response<null> {
  @ApiProperty({ example: 500 })
  statusCode: number;
  @ApiProperty({ example: 'Internal Server Error!' })
  message: string;
}
