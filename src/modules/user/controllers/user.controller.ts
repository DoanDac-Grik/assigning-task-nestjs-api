import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../../../common/common.interface';
@ApiTags('Users')
@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt-two-factor'))
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const user = req.user;
    return user;
  }
}
