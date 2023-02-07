import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SubscriberController } from './subscriber.controller';

@Module({
  imports: [ConfigModule],
  controllers: [SubscriberController],
  providers: [
    {
      provide: 'SUBSCRIBER_SERVICE',
      useFactory: (configService: ConfigService) => {
        //TCP configuration
        // return ClientProxyFactory.create({
        //   transport: Transport.TCP,
        //   options: {
        //     host: configService.get('SUBSCRIBER_SERVICE_HOST'),
        //     port: configService.get('SUBSCRIBER_SERVICE_PORT'),
        //   },
        // });

        //RabbitMQ Configuration
        // const user = configService.get('RABBITMQ_USER');
        // const password = configService.get('RABBITMQ_USER_PASSWORD');
        // const host = configService.get('RABBITMQ_HOST');
        // const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        // return ClientProxyFactory.create({
        //   transport: Transport.RMQ,
        //   options: {
        //     urls: [`amqp://${user}:${password}@${host}`],
        //     queue: queueName,
        //     queueOptions: { durable: true },
        //   },
        // });

        // gRPC Connection
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'subscribers', //Name of the package in subscribers.proto file
            protoPath: join(process.cwd(), 'src/subscriber/subscribers.proto'),
            url: configService.get('GRPC_CONNECT_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class SubscriberModule {}
