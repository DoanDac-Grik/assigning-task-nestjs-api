import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from '../../../common/common.interface';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private reverse(s: string) {
    return s.split('').reverse().join('');
  }

  async create(userDto: Partial<User>) {
    userDto.password = await bcrypt.hash(userDto.password, 10);

    const user = await this.userRepository.findByCondition({
      email: userDto.email,
    });

    if (user.length > 0) {
      throw new HttpException(
        `User ${userDto.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userRepository.create(userDto);
  }

  async findByLogin(loginPayload: LoginUserDto) {
    const user = await this.userRepository.findOneByCondition({
      email: loginPayload.email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isEqual = bcrypt.compareSync(loginPayload.password, user.password);

    if (!isEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByCondition(
      {
        email: email,
      },
      '-password',
    );

    console.log('lololo', user);
    return user;
  }

  async update(filter: Partial<User>, update: Partial<User>) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        //The beginning of the refresh tokens are the same, just different from the ending
        //Because of the limitation of hash, we need to reverse to get the ending token
        this.reverse(update.refreshToken),
        10,
      );
    }
    return await this.userRepository.findByConditionAndUpdate(filter, update);
  }

  async updateRole(id: string, role: string): Promise<Response<null>> {
    try {
      //TODO: Check duplicate role
      const user = await this.userRepository.findByConditionAndUpdate(
        { _id: id },
        {
          $push: { roles: role },
        },
      );
      console.log(user);
      return {
        statusCode: HttpStatus.OK,
        message: `Update role for user ${user.name}`,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail to update role for user',
        error: error,
      };
    }
  }

  async getUserByRefresh(refresh_token: string, email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = await bcrypt.compare(
      //Reversing to compare the ending
      this.reverse(refresh_token),
      user.refreshToken,
    );

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  //Two Factor Authentication Integration
  async setTwoFactorAuthenticationSecret(secret: string, userId: string) {
    return this.userRepository.findByIdAndUpdate(userId, {
      twoFactorAuthenticationSecret: secret,
    });
  }

  //TODO: maybe change this method to update two factor authentication status
  //because user can turn on/off two factor authentication
  async turnOnTwoFactorAuthentication(userId: string) {
    const user = await this.userRepository.findByIdAndUpdate(userId, {
      isTwoFactorAuthenticationEnabled: true,
    });

    return {
      statusCode: HttpStatus.OK,
      message: `Turn on two factor authentication for ${user.name}`,
    };
  }
}
