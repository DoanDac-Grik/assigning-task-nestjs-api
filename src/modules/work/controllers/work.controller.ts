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
import { ApiTags } from '@nestjs/swagger';
import { MongoIdDto, PaginationQueryDto } from '../../../common/common.dto';
import { RequestWithUser } from '../../../common/common.interface';
import PermissionGuard from '../../user/permision.guard';
import Permission from '../../user/permission.type';
import {
  SwaggerCreateWork,
  SwaggerDeleteWork,
  SwaggerGetWork,
  SwaggerListWorks,
  SwaggerUpdateWork,
} from '../decorators/workSwagger.decorator';
import { CreateWorkDto, UpdateWorkDto } from '../dtos/work.dto';
import { WorkService } from '../services/work.service';
@UseGuards(AuthGuard('jwt-two-factor'))
@Controller('works')
@ApiTags('Works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}
  @Get()
  @SwaggerListWorks()
  async getAllWorks(@Query() { page, limit, start }: PaginationQueryDto) {
    return this.workService.getAll(page, limit, start);
  }

  @UseGuards(PermissionGuard(Permission.CreateWork))
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

  @UseGuards(PermissionGuard(Permission.UpdateWork))
  @Put('/:id')
  @SwaggerUpdateWork()
  async updateWork(
    @Body() update: UpdateWorkDto,
    @Param() paramId: MongoIdDto,
  ) {
    return this.workService.update(paramId.id, update);
  }

  @UseGuards(PermissionGuard(Permission.DeleteWork))
  @Delete('/:id')
  @SwaggerDeleteWork()
  async deleteWork(@Param() paramId: MongoIdDto) {
    return this.workService.delete(paramId.id);
  }
}
