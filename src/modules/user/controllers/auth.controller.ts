import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../../../common/common.interface';
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  QueryTokenDto,
  ResetPasswordDto,
} from '../dto/user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  async refresh(@Body() body) {
    return await this.authService.refresh(body.refresh_token);
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  async logout(@Req() req: RequestWithUser) {
    await this.authService.logout(req.user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User logged out',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    await this.authService.forgotPassword(body.email);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Mail sent successfully',
    };
  }

  @Get('reset-password')
  async getResetPasswordPage(@Query() token: QueryTokenDto) {
    return `<!DOCTYPE html>
    <html>
    <body>
    <style>
    </style>
    <h2>Reset Password</h2>

    <form action="/auth/reset-password?token=${token.token}" method ="post">
      <label for="newPassword">Input your new password:</label><br>
      <input type="text" id="newPassword" name="newPassword" value=""><br>
      <input type="submit" value="Submit">
    </form>

    </body>
    </html>`;
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
    @Query() token: QueryTokenDto,
  ) {
    return await this.authService.resetPassword(token.token, body.newPassword);
  }
}
