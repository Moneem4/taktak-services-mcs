import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('main');

async function bootstrap() {

  try {
    const microserviceOptions = {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://minebeat:minebeat@127.0.0.1:5672/minebeatEvents'],
        queue: 'minebeatEvents',
        noAck: true,
        queueOptions: {
          durable: true
        },
      },
    }  
  
    const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);  
    app.listen(() => logger.log('event Microservice is listening'));
  } catch (error) {
    console.log(error)
  }
  
}
bootstrap().catch(e => console.log(e));