import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  BadRequestResponse,
  ForbidenResponse,
  InternalErrorResponse,
  UnAuthResponse,
} from '../../../common/common.dto';
import { UpdateRoleDto } from '../dto/user.dto';

export function SwaggerSetRole() {
  return applyDecorators(
    ApiBody({ type: UpdateRoleDto }),
    ApiResponse({
      status: 200,
      description: 'Update role successfully',
      // type: LoginSuccessResponse,
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
  );
}
