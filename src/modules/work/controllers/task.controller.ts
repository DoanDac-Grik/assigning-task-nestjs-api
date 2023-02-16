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
import { PaginationQueryDto } from '../../../common/common.dto';
import { RequestWithUser } from '../../../common/common.interface';
import {
  AssignReviewerDto,
  AssignTaskDto,
  CreateTaskDto,
  ParamIdsDto,
  UpdateTaskDto,
} from '../dtos/task.dto';
import { TaskService } from '../services/task.service';

@UseGuards(AuthGuard('jwt-two-factor'))
@Controller('works/:workId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Query() { page, limit, start }: PaginationQueryDto) {
    return this.taskService.getAll(page, limit, start);
  }

  @Post()
  async createTask(@Req() req: RequestWithUser, @Body() data: CreateTaskDto) {
    return this.taskService.create(req.user, data);
  }

  //TODO: check task belong to workid
  @Get('/:taskId')
  async getTaskById(@Param() paramIds: ParamIdsDto) {
    return this.taskService.getById(paramIds.taskId);
  }

  @Put('/:taskId')
  async updateTask(
    @Body() data: UpdateTaskDto,
    @Param() paramIds: ParamIdsDto,
  ) {
    return this.taskService.update(paramIds.taskId, data);
  }

  @Delete('/:taskId')
  async deleteTask(@Param() paramIds: ParamIdsDto) {
    return this.taskService.delete(paramIds.taskId);
  }

  @Put('/:taskId/assign')
  async assignTask(
    @Param() paramIds: ParamIdsDto,
    @Body() data: AssignTaskDto,
  ) {
    return this.taskService.assign(paramIds.taskId, data);
  }

  @Put('/:taskId/un-assign')
  async unAssignTask(@Param() paramIds: ParamIdsDto) {
    return this.taskService.unAssign(paramIds.taskId);
  }

  @Put('/:taskId/assign-reviewer')
  async assignReviewer(
    @Param() paramIds: ParamIdsDto,
    @Body() data: AssignReviewerDto,
  ) {
    return this.taskService.assignReviewer(paramIds.taskId, data);
  }

  @Put('/:taskId/un-assign-reviewer')
  async unAssignReviewer(@Param() paramIds: ParamIdsDto) {
    return this.taskService.unAssignReviewer(paramIds.taskId);
  }
}
