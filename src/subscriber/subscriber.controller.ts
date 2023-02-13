import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, ClientProxy, GrpcMethod } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../common/common.interface';
import SubscriberInterface from './subscriber.interface';

@Controller('subscriber')
export class SubscriberController implements OnModuleInit {
  private gRpcService: SubscriberInterface;
  constructor(
    // @Inject('SUBSCRIBER_SERVICE')
    // private readonly subscriberService: ClientProxy,
    @Inject('SUBSCRIBER_SERVICE')
    private client: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.gRpcService =
      this.client.getService<SubscriberInterface>('SubscriberService');
  }

  //TCP Connection
  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // async getSubscribers() {
  //   //TODO: Sau này nếu muốn phần data có thể truyền thêm các parma để pagination...
  //   return this.subscriberService.send({ cmd: 'get-all-subscribers' }, {});
  // }

  // @Post()
  // @UseGuards(AuthGuard('jwt'))
  // async createSubscriberTCP(@Req() req: RequestWithUser) {
  //   return this.subscriberService.send({ cmd: 'add-subscriber' }, req.user);
  // }

  // @Post('event')
  // @UseGuards(AuthGuard('jwt'))
  // async createSubscriberEvent(@Req() req: RequestWithUser) {
  //   this.subscriberService.emit({ cmd: 'add-subscriber' }, req.user);
  // }

  //RabbitMQ Connection, same for the rest
  // @Post('rmq')
  // @UseGuards(AuthGuard('jwt'))
  // async createPost(@Req() req: RequestWithUser) {
  //   return this.subscriberService.send(
  //     {
  //       cmd: 'add-subscriber',
  //     },
  //     req.user,
  //   );
  // }

  //GRPC Connection
  @Get()
  async getSubscribers() {
    return this.gRpcService.getAllSubscribers({});
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req: RequestWithUser) {
    return this.gRpcService.addSubscriber({
      email: req.user.email,
      name: req.user.name,
    });
  }
}
