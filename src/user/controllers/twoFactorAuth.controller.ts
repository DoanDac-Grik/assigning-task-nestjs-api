import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthenticationService } from '../services/twoFactorAuth.service';
import { UserService } from '../services/user.service';

@Controller('2fa')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthenticationService,
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('generate')
  @UseGuards(AuthGuard('jwt'))
  async generate(@Res() res: any, @Req() req: any) {
    const { otpUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(
        req.user,
      );
    console.log(otpUrl);
    return this.twoFactorAuthService.pipeQrCodeStream(res, otpUrl);
  }

  @Post('authenticate')
  @UseGuards(AuthGuard('jwt'))
  async authentication(@Req() req: any, @Body('code') code) {
    const isCodeValid =
      await this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
        code,
        req.user,
      );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    return this.authService.getAccess2FA(req.user);
  }

  @Post('turn-on')
  @UseGuards(AuthGuard('jwt'))
  async turnOn2FA(@Req() req: any) {
    return this.userService.turnOnTwoFactorAuthentication(req.user._id);
  }
}
