import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: any) {
    const user = req.user;

    return {
      id: user.id,
      email: user.email,
      refreshToken: user.refreshToken,
    };
  }
}
