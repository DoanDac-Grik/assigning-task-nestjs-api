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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser, Response } from '../../../common/common.interface';
import { UpdateRoleDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import Role from '../role.enum';
import RoleGuard from '../role.guard';
import { UserService } from '../services/user.service';
import { SwaggerSetRole } from '../swagger/user.swagger';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.SuperAdmin))
  @UseGuards(AuthGuard('jwt-two-factor'))
  @Put('set-role')
  @SwaggerSetRole()
  async updateRole(@Body() body: UpdateRoleDto) {
    return this.userService.updateRole(body.userId, body.role);
  }
}
