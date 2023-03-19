import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  BadRequestResponse,
  ForbidenResponse,
  InternalErrorResponse,
  UnAuthResponse,
} from '../../../common/common.dto';
import {
  AssignTaskSuccessResponse,
  CreateTaskDto,
  CreateTaskSuccessResponse,
  DeleteTaskSuccessResponse,
  GetTaskSuccessResponse,
  ListTasksSuccessResponse,
  UnAssignReviewerSuccessResponse,
  UnAssignTaskSuccessResponse,
  UpdateTaskDto,
  UpdateTaskSuccessResponse,
} from '../dtos/task.dto';

const DESCRIPTION_FOR_PAGE =
  'Current page to pagination, if not have value, default is 1';
const DESCRIPTION_FOR_LIMIT =
  'Page size to pagination, if not have value, default is 5';
const DESCRIPTION_FOR_START = 'Id to start pagination';

// TODO: Need to declare and explain the response and example...

export function SwaggerCreateTask() {
  return applyDecorators(
    ApiBody({ type: CreateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Create task successfully',
      type: CreateTaskSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}

export function SwaggerListTasks() {
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
      description: 'Get list of tasks successfully',
      type: ListTasksSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}

export function SwaggerGetTask() {
  return applyDecorators(
    ApiParam({
      name: 'taskId',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Get task by id successfully',
      type: GetTaskSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}

export function SwaggerUpdateTask() {
  return applyDecorators(
    ApiParam({
      name: 'taskId',
      required: false,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Update task successfully',
      type: UpdateTaskSuccessResponse,
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
      name: 'taskId',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Delete task by id successfully',
      type: DeleteTaskSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}

export function SwaggerAssignTask() {
  return applyDecorators(
    ApiParam({
      name: 'taskId',
      required: false,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Assign task successfully',
      type: AssignTaskSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}

export function SwaggerUnassignTask() {
  return applyDecorators(
    ApiParam({
      name: 'taskId',
      required: false,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Unassign task successfully',
      type: UnAssignTaskSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}

export function SwaggerAssignReviewer() {
  return applyDecorators(
    ApiParam({
      name: 'taskId',
      required: false,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Assign reviewer successfully',
      type: UnAssignReviewerSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}

export function SwaggerUnassignReviewer() {
  return applyDecorators(
    ApiParam({
      name: 'taskId',
      required: false,
      type: String,
    }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({
      status: 201,
      description: 'Unassign reviewer successfully',
      type: UnAssignReviewerSuccessResponse,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      type: ForbidenResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: InternalErrorResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestResponse,
    }),
  );
}
