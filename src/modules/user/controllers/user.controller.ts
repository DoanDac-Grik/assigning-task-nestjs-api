import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser, Response } from '../../../common/common.interface';
import { User } from '../models/user.model';
@ApiTags('Users')
@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  // @UseGuards(AuthGuard('jwt-two-factor'))
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser): Promise<Response<User>> {
    const user = req.user;
    return {
      statusCode: HttpStatus.OK,
      message: 'User profile!',
      data: user,
    };
  }
}
