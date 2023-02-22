import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Stage } from '../constants/task.constant';
// TODO: Add exmpale for swagger
export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  workId: string;

  @ApiProperty({ example: 'okok' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  document_link: string;
}

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Stage)
  stage: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  document_link: string;
}

export class AssignTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  assignee: string;
}

export class AssignReviewerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  reviewer: string;
}

export class ParamIdsDto {
  @IsMongoId()
  workId: string;
  @IsOptional()
  @IsMongoId()
  taskId: string;
}
