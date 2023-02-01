import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() @MinLength(4) password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  newPassword: string;
}

export class QueryTokenDto {
  @IsNotEmpty()
  token: string;
}
