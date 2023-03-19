import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Response } from '../../../common/common.interface';
import { Stage } from '../constants/task.constant';
import { Task } from '../models/task.model';
// TODO: Add exmpale for swagger
export class CreateTaskDto {
  @ApiProperty({ example: '63eb36b7a912bd39e74c86c7' })
  @IsNotEmpty()
  @IsMongoId()
  workId: string;

  @ApiProperty({ example: 'Task example' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Task example description' })
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
  // @IsMongoId()
  // workId: string;
  @IsOptional()
  @IsMongoId()
  taskId: string;
}

//For Swagger api response
export class CreateTaskSuccessResponse implements Response<Task> {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Create task successfully' })
  message: string;
  @ApiProperty({
    example: {
      _id: '6402c0dff127bff4dbae5947',
      title: 'Task Example',
      description: 'Task Example',
      workId: 'Task Example',
      reviewer: 'Task Example',
      stage: 'Doing',
      document_link: 'null',
    },
  })
  data: Task;
}

export class ListTasksSuccessResponse implements Response<Task[]> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'List task successfully' })
  message: string;
  @ApiProperty({
    example: [
      {
        _id: '6402c0dff127bff4dbae5947',
        title: 'Task Example',
        description: 'Task Example',
        workId: 'Task Example',
        reviewer: 'Task Example',
        stage: 'Doing',
        document_link: 'null',
      },
      {
        _id: '6402c0dff127bff4dbae5947',
        title: 'Task Example',
        description: 'Task Example',
        workId: 'Task Example',
        reviewer: 'Task Example',
        stage: 'Doing',
        document_link: 'null',
      },
    ],
  })
  data: Task[];
}

export class GetTaskSuccessResponse implements Response<Task> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Get task successfully' })
  message: string;
  @ApiProperty({
    example: {
      _id: '6402c0dff127bff4dbae5947',
      title: 'Task Example',
      description: 'Task Example',
      workId: 'Task Example',
      reviewer: 'Task Example',
      stage: 'Doing',
      document_link: 'null',
    },
  })
  data: Task;
}

export class UpdateTaskSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Update task successfully' })
  message: string;
}

export class DeleteTaskSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Delete task successfully' })
  message: string;
}

export class AssignTaskSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Assign task successfully' })
  message: string;
}

export class UnAssignTaskSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Unassign task successfully' })
  message: string;
}

export class AssigneReviewerSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Assign Reviewer successfully' })
  message: string;
}

export class UnAssignReviewerSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Unassign Reviewer successfully' })
  message: string;
}
