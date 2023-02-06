import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscriber')
export class SubscriberController {
  constructor(
    @Inject('SUBSCRIBER_SERVICE')
    private readonly subscriberService: ClientProxy,
  ) {}

  //TCP Connection
  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // async getSubscribers() {
  //   //TODO: Sau này nếu muốn phần data có thể truyền thêm các parma để pagination...
  //   return this.subscriberService.send({ cmd: 'get-all-subscribers' }, {});
  // }

  // @Post()
  // @UseGuards(AuthGuard('jwt'))
  // async createSubscriberTCP(@Req() req: any) {
  //   return this.subscriberService.send({ cmd: 'add-subscriber' }, req.user);
  // }

  // @Post('event')
  // @UseGuards(AuthGuard('jwt'))
  // async createSubscriberEvent(@Req() req: any) {
  //   this.subscriberService.emit({ cmd: 'add-subscriber' }, req.user);
  // }

  //RabbitMQ Connection
  @Post('rmq')
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req: any) {
    return this.subscriberService.send(
      {
        cmd: 'add-subscriber',
      },
      req.user,
    );
  }
}
