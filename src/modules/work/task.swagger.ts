import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';

const DESCRIPTION_FOR_PAGE =
  'Current page to pagination, if not have value, default is 1';
const DESCRIPTION_FOR_LIMIT =
  'Page size to pagination, if not have value, default is 5';
const DESCRIPTION_FOR_START = 'Id to start pagination';
const DESCRIPTION_FOR_WORK_ID = 'Work Id that contains this task';
const DESCRIPTION_FOR_TASK_ID = 'Task Id';

// TODO: Need to declare and explain the response and example...

export function SwaggerCreateTask() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiBody({ type: CreateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Create task successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerListTasks() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
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
      description: 'Get list of tasks successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerGetTask() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiParam({
      name: 'taskId',
      required: false,
      description: DESCRIPTION_FOR_TASK_ID,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Get task by id successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerUpdateTask() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiParam({
      name: 'taskId',
      required: false,
      description: DESCRIPTION_FOR_TASK_ID,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Update task successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerDeleteTask() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiParam({
      name: 'taskId',
      required: false,
      description: DESCRIPTION_FOR_TASK_ID,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Delete task by id successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerAssignTask() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiParam({
      name: 'taskId',
      required: false,
      description: DESCRIPTION_FOR_TASK_ID,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Assign task successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerUnassignTask() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiParam({
      name: 'taskId',
      required: false,
      description: DESCRIPTION_FOR_TASK_ID,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Unassign task successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerAssignReviewer() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiParam({
      name: 'taskId',
      required: false,
      description: DESCRIPTION_FOR_TASK_ID,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Assign reviewer successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function SwaggerUnassignReviewer() {
  return applyDecorators(
    ApiParam({
      name: 'workId',
      required: false,
      description: DESCRIPTION_FOR_WORK_ID,
      type: String,
    }),
    ApiParam({
      name: 'taskId',
      required: false,
      description: DESCRIPTION_FOR_TASK_ID,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Unassign reviewer successfully',
    }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 500, description: 'Internal Error' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}
