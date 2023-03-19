import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  InternalErrorResponse,
  BadRequestResponse,
  UnAuthResponse,
} from '../../../common/common.dto';
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  QueryTokenDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from '../dto/user.dto';

export function SwaggerLogin() {
  return applyDecorators(
    ApiBody({ type: LoginUserDto }),
    ApiResponse({
      status: 200,
      description: 'Login successfully',
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
  );
}

export function SwaggerRegister() {
  return applyDecorators(
    ApiBody({ type: CreateUserDto }),
    ApiResponse({
      status: 200,
      description: 'Register successfully',
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
  );
}

export function SwaggerRefreshToken() {
  return applyDecorators(
    ApiBody({ type: RefreshTokenDto }),
    ApiResponse({
      status: 200,
      description: 'Refresh token successfully',
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
  );
}

export function SwaggerLogout() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Logout successfully',
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
  );
}

export function SwaggerForgotPassword() {
  return applyDecorators(
    ApiBody({ type: ForgotPasswordDto }),
    ApiResponse({
      status: 200,
      description: 'Reuquest for forgot password successfully',
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
  );
}

export function SwaggerGetResetPasswordPage() {
  return applyDecorators(
    ApiQuery({ type: QueryTokenDto }),
    ApiResponse({
      status: 200,
      description: 'Get page reset password',
      type: String,
    }),
  );
}

export function SwaggerResetPassword() {
  return applyDecorators(
    ApiQuery({ type: QueryTokenDto }),
    ApiBody({ type: ResetPasswordDto }),
    ApiResponse({
      status: 200,
      description: 'Reset password successfully',
      // type:
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
