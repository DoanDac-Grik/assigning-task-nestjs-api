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
import { MongoIdDto, PaginationQueryDto } from '../../../common/common.dto';
import { RequestWithUser } from '../../../common/common.interface';
import { CreateTaskDto } from '../dtos/task.dto';
import { CreateWorkDto, UpdateWorkDto } from '../dtos/work.dto';
import { WorkService } from '../services/work.service';

@UseGuards(AuthGuard('jwt-two-factor'))
@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async getAllWorks(@Query() { page, limit, start }: PaginationQueryDto) {
    return this.workService.getAll(page, limit, start);
  }

  @Post()
  async createWork(@Req() req: RequestWithUser, @Body() data: CreateWorkDto) {
    return this.workService.create(req.user, data);
  }

  @Get('/:id')
  async getWorkById(@Param() paramId: MongoIdDto) {
    return this.workService.getById(paramId.id);
  }

  @Put('/:id')
  async updateWork(
    @Body() update: UpdateWorkDto,
    @Param() paramId: MongoIdDto,
  ) {
    return this.workService.update(paramId.id, update);
  }

  @Delete('/:id')
  async deleteWork(@Param() paramId: MongoIdDto) {
    return this.workService.delete(paramId.id);
  }
}
