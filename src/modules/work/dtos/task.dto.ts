import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Stage } from '../constants/task.constant';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsMongoId()
  workId: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  @IsOptional()
  document_link: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsEnum(Stage)
  stage: string;
  @IsOptional()
  @IsString()
  document_link: string;
}

export class AssignTaskDto {
  @IsNotEmpty()
  @IsMongoId()
  assignee: string;
}

export class AssignReviewerDto {
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
