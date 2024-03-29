import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MongoIdDto, PaginationQueryDto } from '../../../common/common.dto';
import { RequestWithUser } from '../../../common/common.interface';
import Role from '../../user/role.enum';
import RoleGuard from '../../user/role.guard';
import PermissionGuard from '../../user/role.guard';
import { CreateWorkDto, UpdateWorkDto } from '../dtos/work.dto';
import { WorkService } from '../services/work.service';
import {
  SwaggerCreateWork,
  SwaggerDeleteWork,
  SwaggerGetWork,
  SwaggerListWorks,
  SwaggerUpdateWork,
} from '../swagger/work.swagger';
@UseGuards(AuthGuard('jwt-two-factor'))
@ApiBearerAuth()
@Controller('works')
@ApiTags('Works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}
  @Get()
  @SwaggerListWorks()
  async getAllWorks(@Query() { page, limit, start }: PaginationQueryDto) {
    return this.workService.getAll(page, limit, start);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  @SwaggerCreateWork()
  async createWork(@Req() req: RequestWithUser, @Body() data: CreateWorkDto) {
    return this.workService.create(req.user, data);
  }

  @Get('/:id')
  @SwaggerGetWork()
  async getWorkById(@Param() paramId: MongoIdDto) {
    return this.workService.getById(paramId.id);
  }

  @UseGuards(PermissionGuard(Role.Admin))
  @Put('/:id')
  @SwaggerUpdateWork()
  async updateWork(
    @Body() update: UpdateWorkDto,
    @Param() paramId: MongoIdDto,
  ) {
    return this.workService.update(paramId.id, update);
  }

  @UseGuards(PermissionGuard(Role.Admin))
  @Delete('/:id')
  @SwaggerDeleteWork()
  async deleteWork(@Param() paramId: MongoIdDto) {
    return this.workService.delete(paramId.id);
  }
}
