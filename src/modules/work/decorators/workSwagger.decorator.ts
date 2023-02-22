import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateWorkDto, UpdateWorkDto } from '../dtos/work.dto';

const DESCRIPTION_FOR_PAGE =
  'Current page to pagination, if not have value, default is 1';
const DESCRIPTION_FOR_LIMIT =
  'Page size to pagination, if not have value, default is 5';
const DESCRIPTION_FOR_START = 'Id to start pagination';
const DESCRIPTION_FOR_WORK_ID = 'Work Id that contains this task';
const DESCRIPTION_FOR_TASK_ID = 'Task Id';

// TODO: Need to declare and explain the response and example...

export function SwaggerCreateWork() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiBody({ type: CreateWorkDto }),
    ApiResponse({
      status: 201,
      description: 'Create work successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerListWorks() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      description: DESCRIPTION_FOR_PAGE,
      type: Number,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: DESCRIPTION_FOR_LIMIT,
      type: Number,
    }),
    ApiQuery({
      name: 'start',
      required: false,
      description: DESCRIPTION_FOR_START,
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Get list of works successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerGetWork() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Get work by id successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerUpdateWork() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),

    ApiBody({ type: UpdateWorkDto }),
    ApiResponse({
      status: 201,
      description: 'Update work successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerDeleteWork() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Delete work by id successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}
