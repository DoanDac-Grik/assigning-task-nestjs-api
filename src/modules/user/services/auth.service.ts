import { InjectQueue } from '@nestjs/bull';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bull';
import { Response } from '../../../common/common.interface';
import { MailService } from '../../mail/mail.service';
import { CreateUserDto, LoginUserDto, UpdateRoleDto } from '../dto/user.dto';
import { User, UserTokenInfo } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectQueue('auth-mail') private sendMail: Queue, // private readonly mailService: MailService,
  ) {}

  private async _createToken(
    { email, roles },
    isSecondFactorAuthenticated = false,
    refresh = true,
  ) {
    const accessToken = this.jwtService.sign(
      { email, isSecondFactorAuthenticated, roles },
      {
        secret: process.env.SECRETKEY,
        expiresIn: process.env.EXPIRESIN,
      },
    );

    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { email },
        {
          secret: process.env.SECRETKEY_REFRESH,
          expiresIn: process.env.EXPIRESIN_REFRESH,
        },
      );

      await this.userService.update(
        { email: email },
        {
          refreshToken: refreshToken,
        },
      );

      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.EXPIRESIN_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }

  async register(userDto: CreateUserDto): Promise<Response<UserTokenInfo>> {
    const user = await this.userService.create(userDto);

    const token = await this._createToken({
      email: user.email,
      roles: user.roles,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Register successfully',
      data: {
        email: user.email,
        ...token,
      },
    };
  }

  async refresh(refresh_token: string): Promise<Response<UserTokenInfo>> {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      });

      const user = await this.userService.getUserByRefresh(
        refresh_token,
        payload.email,
      );

      const token = await this._createToken(user, false);
      return {
        statusCode: HttpStatus.OK,
        message: 'Refresh token successfully',
        data: {
          email: user.email,
          ...token,
        },
      };
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(user: User) {
    await this.userService.update(
      { email: user.email },
      { refreshToken: null },
    );
  }

  async login(loginUserDto: LoginUserDto): Promise<Response<UserTokenInfo>> {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = await this._createToken(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully',
      data: {
        email: user.email,
        ...token,
      },
    };
  }

  async validateUser(email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async forgotPassword(email: string) {
    //Check email exists
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    //Create Token and link
    const token = this.jwtService.sign(
      { email },
      {
        secret: process.env.RESET_PASSWORD_SECRETKEY,
        expiresIn: process.env.RESET_PASSWORD_EXPIRESIN,
      },
    );

    const link = `http://localhost:3000/auth/reset-password?token=${token}`;

    //Send mail
    //Normal sending mail
    await this.mailService.sendForgotPassword(email, link);

    //Send mail with queue
    // await this.sendMail.add(
    //   'forgot-password',
    //   { email, link },
    //   {
    //     //Remove it from queue when completed
    //     removeOnComplete: true,
    //   },
    // );
  }

  async resetPassword(newPassword: string, token: string) {
    let payload: { email: string };

    //Check Token
    try {
      payload = await this.jwtService.verify(token, {
        secret: process.env.RESET_PASSWORD_SECRETKEY,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token or token expired');
    }

    //Update Password
    try {
      //bcrypt is imported manually
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      await this.userService.update(
        { email: payload.email },
        {
          password: newHashedPassword,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException('Internal Error');
    }
  }

  //2fa
  async getAccess2FA(user: User) {
    return this._createToken(user, true);
  }
}
