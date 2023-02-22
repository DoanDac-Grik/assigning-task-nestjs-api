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
import { PaginationQueryDto } from '../../../common/common.dto';
import { RequestWithUser } from '../../../common/common.interface';
import PermissionGuard from '../../user/permision.guard';
import Permission from '../../user/permission.type';
import {
  SwaggerAssignReviewer,
  SwaggerAssignTask,
  SwaggerCreateTask,
  SwaggerDeleteTask,
  SwaggerGetTask,
  SwaggerListTasks,
  SwaggerUnassignReviewer,
  SwaggerUnassignTask,
  SwaggerUpdateTask,
} from '../decorators/taskSwagger.decorator';
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
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @SwaggerListTasks()
  async getAllTasks(@Query() { page, limit, start }: PaginationQueryDto) {
    return this.taskService.getAll(page, limit, start);
  }

  @Post()
  @SwaggerCreateTask()
  async createTask(@Req() req: RequestWithUser, @Body() data: CreateTaskDto) {
    return this.taskService.create(req.user, data);
  }

  //TODO: check task belong to workid
  @Get('/:taskId')
  @SwaggerGetTask()
  async getTaskById(@Param() paramIds: ParamIdsDto) {
    return this.taskService.getById(paramIds.taskId);
  }

  @Put('/:taskId')
  @SwaggerUpdateTask()
  async updateTask(
    @Body() data: UpdateTaskDto,
    @Param() paramIds: ParamIdsDto,
  ) {
    return this.taskService.update(paramIds.taskId, data);
  }

  @UseGuards(PermissionGuard(Permission.DeleteTask))
  @Delete('/:taskId')
  @SwaggerDeleteTask()
  async deleteTask(@Param() paramIds: ParamIdsDto) {
    return this.taskService.delete(paramIds.taskId);
  }

  @UseGuards(PermissionGuard(Permission.AssignTask))
  @Put('/:taskId/assign')
  @SwaggerAssignTask()
  async assignTask(
    @Param() paramIds: ParamIdsDto,
    @Body() data: AssignTaskDto,
  ) {
    return this.taskService.assign(paramIds.taskId, data);
  }

  @UseGuards(PermissionGuard(Permission.UnAssignTask))
  @Put('/:taskId/un-assign')
  @SwaggerUnassignTask()
  async unAssignTask(@Param() paramIds: ParamIdsDto) {
    return this.taskService.unAssign(paramIds.taskId);
  }

  @UseGuards(PermissionGuard(Permission.AssignReviewer))
  @Put('/:taskId/assign-reviewer')
  @SwaggerAssignReviewer()
  async assignReviewer(
    @Param() paramIds: ParamIdsDto,
    @Body() data: AssignReviewerDto,
  ) {
    return this.taskService.assignReviewer(paramIds.taskId, data);
  }

  @UseGuards(PermissionGuard(Permission.UnAssignReviewer))
  @Put('/:taskId/un-assign-reviewer')
  @SwaggerUnassignReviewer()
  async unAssignReviewer(@Param() paramIds: ParamIdsDto) {
    return this.taskService.unAssignReviewer(paramIds.taskId);
  }
}
