import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Response } from '../../../common/common.interface';
import { Status } from '../constants/work.consant';
import { Work } from '../models/work.model';

export class CreateWorkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class UpdateWorkDto {
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
  @IsEnum(Status)
  status: string;

  @ApiProperty()
  @IsOptional()
  tasks: string[];
}

//For Swagger api response
export class CreateWorkSuccessResponse implements Response<Work> {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Create work successfully' })
  message: string;
  @ApiProperty({
    example: {
      _id: '6402c0dff127bff4dbae5947',
      title: 'Work Example',
      description: 'Work Example',
      status: 'Doing',
    },
  })
  data: Work;
}

export class ListWorksSuccessResponse implements Response<Work[]> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'List work successfully' })
  message: string;
  @ApiProperty({
    example: [
      {
        _id: '6402c0dff127bff4dbae5947',
        title: 'Work Example',
        description: 'Work Example',
        status: 'Doing',
      },
      {
        _id: '6402c0dff127bff4dbae5947',
        title: 'Work Example',
        description: 'Work Example',
        status: 'Doing',
      },
    ],
  })
  data: Work[];
}

export class GetWorkSuccessResponse implements Response<Work> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Get work successfully' })
  message: string;
  @ApiProperty({
    example: {
      _id: '6402c0dff127bff4dbae5947',
      title: 'Work Example',
      description: 'Work Example',
      status: 'Doing',
    },
  })
  data: Work;
}

export class UpdateWorkSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Update work successfully' })
  message: string;
}

export class DeleteWorkSuccessResponse implements Response<null> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Delete work successfully' })
  message: string;
}
