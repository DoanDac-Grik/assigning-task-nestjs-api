import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MailService } from '../mail/mail.service';
import { AuthController } from './controllers/auth.controller';
import { TwoFactorAuthenticationController } from './controllers/twoFactorAuth.controller';
import { UserController } from './controllers/user.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtTwoFactorStrategy } from './jwtTwoFactor.strategy';
import { UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { TwoFactorAuthenticationService } from './services/twoFactorAuth.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [
    UserController,
    AuthController,
    TwoFactorAuthenticationController,
  ],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    JwtStrategy,
    MailService,
    TwoFactorAuthenticationService,
    JwtTwoFactorStrategy,
  ],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      //To get credentials
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: { expiresIn: configService.get('EXPIRESIN') },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
