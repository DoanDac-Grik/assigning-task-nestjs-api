import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  BadRequestResponse,
  InternalErrorResponse,
  UnAuthResponse,
} from '../../../common/common.dto';

export function SwaggerGenerateQR() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Get QR Code successfully',
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
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
  );
}

export function Swagger2FA() {
  return applyDecorators(
    ApiBody({ type: String }),
    ApiResponse({
      status: 200,
      description: 'Auth successfully',
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
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
  );
}

export function SwaggerTurnOn2Fa() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Turn on 2fa successfully',
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
      status: 401,
      description: 'Unauthorized.',
      type: UnAuthResponse,
    }),
  );
}
