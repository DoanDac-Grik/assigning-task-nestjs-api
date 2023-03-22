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
import { PaginationQueryDto } from '../../../common/common.dto';
import { RequestWithUser } from '../../../common/common.interface';
import Role from '../../user/role.enum';
import RoleGuard from '../../user/role.guard';
import {
  AssignReviewerDto,
  AssignTaskDto,
  CreateTaskDto,
  ParamIdsDto,
  UpdateTaskDto,
} from '../dtos/task.dto';
import { TaskService } from '../services/task.service';
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
} from '../swagger/task.swagger';

//TODO: check task belong to workid
@UseGuards(AuthGuard('jwt-two-factor'))
@ApiBearerAuth()
@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @SwaggerListTasks()
  async getAllTasks(@Query() { page, limit, start }: PaginationQueryDto) {
    return this.taskService.getAll(page, limit, start);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  @SwaggerCreateTask()
  async createTask(@Req() req: RequestWithUser, @Body() data: CreateTaskDto) {
    return this.taskService.create(req.user, data);
  }

  @Get('/:taskId')
  @SwaggerGetTask()
  async getTaskById(@Param() paramIds: ParamIdsDto) {
    return this.taskService.getById(paramIds.taskId);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Put('/:taskId')
  @SwaggerUpdateTask()
  async updateTask(
    @Body() data: UpdateTaskDto,
    @Param() paramIds: ParamIdsDto,
  ) {
    return this.taskService.update(paramIds.taskId, data);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Delete('/:taskId')
  @SwaggerDeleteTask()
  async deleteTask(@Param() paramIds: ParamIdsDto) {
    return this.taskService.delete(paramIds.taskId);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Put('/:taskId/assign')
  @SwaggerAssignTask()
  async assignTask(
    @Param() paramIds: ParamIdsDto,
    @Body() data: AssignTaskDto,
  ) {
    return this.taskService.assign(paramIds.taskId, data);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Put('/:taskId/un-assign')
  @SwaggerUnassignTask()
  async unAssignTask(@Param() paramIds: ParamIdsDto) {
    return this.taskService.unAssign(paramIds.taskId);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Put('/:taskId/assign-reviewer')
  @SwaggerAssignReviewer()
  async assignReviewer(
    @Param() paramIds: ParamIdsDto,
    @Body() data: AssignReviewerDto,
  ) {
    return this.taskService.assignReviewer(paramIds.taskId, data);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Put('/:taskId/un-assign-reviewer')
  @SwaggerUnassignReviewer()
  async unAssignReviewer(@Param() paramIds: ParamIdsDto) {
    return this.taskService.unAssignReviewer(paramIds.taskId);
  }
}
