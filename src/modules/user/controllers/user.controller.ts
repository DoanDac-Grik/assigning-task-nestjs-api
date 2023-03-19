import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser, Response } from '../../../common/common.interface';
import { UpdateRoleDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import Role from '../role.enum';
import RoleGuard from '../role.guard';
import { UserService } from '../services/user.service';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @UseGuards(RoleGuard(Role.SuperAdmin))
  @UseGuards(AuthGuard('jwt-two-factor'))
  @Put('set-role')
  async updateRole(@Body() body: UpdateRoleDto) {
    return this.userService.updateRole(body.userId, body.role);
  }
}
