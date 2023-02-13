import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './services/auth.service';

//This class supports for authentication via jwt, inherit from PassportStrategy
@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'jwt-two-factor',
) {
  constructor(private readonly authService: AuthService) {
    super({
      //Get token from Auth Header - Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //Secretkey
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate({ email, isSecondFactorAuthenticated }) {
    let user = await this.authService.validateUser(email);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    if (
      !user.isTwoFactorAuthenticationEnabled &&
      !isSecondFactorAuthenticated
    ) {
      throw new HttpException('Permission Denied', HttpStatus.FORBIDDEN);
    }

    //TODO: update later
    user.password = undefined;
    return user;
  }
}
