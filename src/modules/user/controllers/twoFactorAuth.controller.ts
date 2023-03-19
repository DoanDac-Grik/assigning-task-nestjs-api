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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../../../common/common.interface';

import { AuthService } from '../services/auth.service';
import { TwoFactorAuthenticationService } from '../services/twoFactorAuth.service';
import { UserService } from '../services/user.service';
import {
  Swagger2FA,
  SwaggerGenerateQR,
  SwaggerTurnOn2Fa,
} from '../swagger/2fa.swagger';
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('2fa')
@ApiTags('Two Factor Authentication')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthenticationService,
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('generate')
  @SwaggerGenerateQR()
  async generate(@Res() res: any, @Req() req: RequestWithUser) {
    const { otpUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(
        req.user,
      );
    console.log(otpUrl);
    return this.twoFactorAuthService.pipeQrCodeStream(res, otpUrl);
  }

  @Post('authenticate')
  @Swagger2FA()
  async authentication(@Req() req: RequestWithUser, @Body() code: string) {
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
  @SwaggerTurnOn2Fa()
  async turnOn2FA(@Req() req: RequestWithUser) {
    return this.userService.turnOnTwoFactorAuthentication(req.user._id);
  }
}
