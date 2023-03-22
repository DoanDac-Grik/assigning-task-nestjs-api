import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import Role from '../role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  refresh_token: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}

export class QueryTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}

export class UpdateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role: string;
}
